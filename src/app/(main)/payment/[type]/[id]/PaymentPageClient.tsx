"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Tag, Loader2 } from "lucide-react";
import { loadRazorpayScript } from "@/utils/loadRazorpay";
import {
  getOrderSummaryApi,
  applyCouponApi,
  registerApi,
  verifyPaymentApi,
} from "@/features/payment/payment.api";
import type { OrderSummaryResponse } from "@/features/payment/payment.types";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  type: string;
  id: string;
};

export default function PaymentPageClient({ type, id }: Props) {
  const router = useRouter();

  // ═══ States ═══
  const [data, setData] = useState<OrderSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // ═══ Fetch Order Summary on Mount ═══
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getOrderSummaryApi(type, id);
        setData(res);
      } catch (err: any) {
        setError(err?.message || "Failed to load order summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [type, id]);

  // ═══ Apply Coupon ═══
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Enter a coupon code");
      return;
    }

    try {
      setCouponLoading(true);
      setCouponError(null);

      const res = await applyCouponApi(type, id, {
        coupon_code: couponCode.trim(),
      });

      setData(res);
      setCouponApplied(true);
      toast.success("Coupon applied successfully");
    } catch (err: any) {
      setCouponError(err?.message || "Invalid coupon code");
      toast.error(err?.message || "Invalid coupon code");
    } finally {
      setCouponLoading(false);
    }
  };

  // ═══ Remove Coupon ═══
  const handleRemoveCoupon = async () => {
    setCouponCode("");
    setCouponApplied(false);
    setCouponError(null);

    try {
      const res = await getOrderSummaryApi(type, id);
      setData(res);
    } catch {}
  };

  // ═══════════════════════════════════════
  // MAIN CHECKOUT — RAZORPAY INTEGRATION
  // ═══════════════════════════════════════
  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);

      // Step 1: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Payment system failed to load. Please refresh.");
        return;
      }

      // Step 2: Call register API (creates Razorpay order on backend)
      const registerRes = await registerApi(type, id, {
        coupon_code: couponApplied ? couponCode : undefined,
      });

      // Step 3: If payment not required (free event)
      if (!registerRes.payment_required) {
        toast.success(registerRes.message || "Registration successful!");
        router.push(`/${type}`);
        return;
      }

      // Step 4: Validate Razorpay data
      const razorpayData = registerRes.razorpay;
      if (!razorpayData) {
        toast.error("Payment data missing from server");
        return;
      }

      // Step 5: Open Razorpay checkout modal
      const options = {
        key: razorpayData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        name: razorpayData.name,
        description: razorpayData.description,
        order_id: razorpayData.order_id,

        // ══════════════════════════════
        // PAYMENT SUCCESS CALLBACK
        // ══════════════════════════════
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // Step 6: Verify payment on backend
            await verifyPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              registration_id: razorpayData.registration_id,
            });

            toast.success("Payment successful! Registration confirmed.");
            router.push(`/${type}`);
          } catch (verifyErr: any) {
            console.error("Payment verification failed:", verifyErr);
            toast.error(
              "Payment received but verification failed. Contact support.",
            );
          }
        },

        prefill: {},

        notes: {
          registration_id: razorpayData.registration_id,
          item_type: type,
          item_id: id,
        },

        theme: {
          color: "#7C3AED",
        },

        // ══════════════════════════════
        // PAYMENT POPUP CLOSED/CANCELLED
        // ══════════════════════════════
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
            setCheckoutLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error(err?.message || "Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // ═══ Derived values ═══
  const summary = data?.data;
  const event = summary?.event;
  const pricing = summary?.pricing;

  // ═══ Loading state ═══
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  // ═══ Error state ═══
  if (error || !summary) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="space-y-3 text-center">
          <p className="text-sm text-red-500">{error || "Unable to load"}</p>
          <button
            onClick={() => router.back()}
            className="rounded-lg bg-primary-500 px-4 py-2 text-white text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ═══ RENDER ═══
  return (
    <div className="min-h-screen md:p-2">
      <div className="mx-auto max-w-full">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          Back to {type}
        </button>

        {/* Order Summary Card */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Order Summary</h3>
           
          </div>
          {/* Event Info */}
          <div className="flex gap-4 border-t pt-4 border-border">
            <div className="relative h-30 w-30 shrink-0 overflow-hidden rounded-xl mt-4">
              <Image
                src={event?.banner_image || "https://picsum.photos/200"}
                alt={event?.title || "Event"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="mt-2 flex items-center gap-3">
                <Badge className="rounded-sm bg-primary-50 px-3 py-3 text-sm font-medium text-primary-600">
                  {event?.event_type || "Event"}
                </Badge>

                <Badge className="rounded-sm bg-primary-50 px-3 py-3 text-sm font-medium text-primary-600">
                  {event?.language === "hi" ? "Hindi" : "English"}
                </Badge>
              </div>
              <h3 className="font-medium text-gray-900">{event?.title}</h3>
              <span className="inline-flex items-center gap-2 shrink-0">
                <span className="font-medium text-gray-900">
                  {" "}
                  {pricing?.total === 0 ? "Free" : `₹${pricing?.total}`}
                </span>
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Price</span>
              <span className="text-gray-900">₹{pricing?.original_price}</span>
            </div>

            {(pricing?.discount ?? 0) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Discount</span>
                <span className="text-green-600">-₹{pricing?.discount}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (GST)</span>
              <span className="text-gray-900">{pricing?.tax_gst}</span>
            </div>

            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total</span>
              <span className="text-primary-600">
                {pricing?.total === 0 ? "Free" : `₹${pricing?.total}`}
              </span>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="mt-6">
            {couponApplied ? (
              <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    {couponCode}
                  </span>
                  <span className="text-xs text-green-600">Applied</span>
                </div>
                <Button
                  onClick={handleRemoveCoupon}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponError(null);
                    }}
                    placeholder="Enter promo code"
                    className="flex-1 rounded-lg border px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="rounded-lg border  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-50 disabled:opacity-50"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </Button>
                </div>
                {couponError && (
                  <p className="text-xs text-red-500">{couponError}</p>
                )}
              </div>
            )}

            <Button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-500 font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkoutLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : pricing?.total === 0 ? (
                "Register for Free"
              ) : (
                `Pay ₹${pricing?.total}`
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
