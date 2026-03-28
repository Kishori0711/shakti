"use client";

import React from "react";
import { FiTag } from "react-icons/fi";
import { Button } from "../ui/button";

type OrderItem = {
  image: string;
  title: string;
  meta: string;
  price: string;
  tags: { label: string; variant?: "default" | "secondary" }[];
};

type Props = {
  item: OrderItem;
  open: boolean;
  setOpen: (v: boolean) => void;
  onStart: () => void;
  onDashboard: () => void;
};

const OrderSummarySection: React.FC<Props> = ({
  item,
  open,
  setOpen,
  onStart,
  onDashboard,
}) => {
  // ✅ Razorpay Payment Handler
  const handlePayment = async () => {
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Your Company",
        description: "Course Purchase",
        order_id: data.id,

        handler: async function (response: any) {
          console.log("Payment Success:", response);

          // ✅ Optional: verify payment
          await fetch("/api/verify-payment", {
            method: "POST",
            body: JSON.stringify(response),
          });

          setOpen(true); // open success modal
        },

        prefill: {
          name: "User Name",
          email: "user@email.com",
        },

        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
    }
  };

  return (
    <section className="lg:col-span-2 h-fit rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Order Summary</h3>
        <span className="text-xs text-muted-foreground">Cancel Any Time</span>
      </div>

      <hr className="my-4 border-border" />

      {/* Course Info */}
      <div className="mb-4 flex gap-3">
        <img
          src={item.image}
          alt="course"
          className="h-28 w-[110px] rounded-lg object-cover"
        />

        <div className="text-sm">
          <p className="font-medium text-foreground">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.meta}</p>
          <p className="mt-1 font-semibold text-foreground">{item.price}</p>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-4 flex h-11 items-center rounded-lg border border-input bg-background px-3 text-sm">
        <FiTag className="mr-2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Enter promo code"
          className="flex-1 bg-transparent outline-none"
        />
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Price</span>
          <span>₹1,999</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>-₹600</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (GST)</span>
          <span>Included</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
        <span>Total</span>
        <span>₹1,399</span>
      </div>

      <Button>Pay ₹1399 Securely</Button>
    </section>
  );
};

export default OrderSummarySection;
