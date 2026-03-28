import api from "@/lib/client/mainApi";
import type {
  OrderSummaryResponse,
  CouponApplyPayload,
  RegisterResponse,
  PaymentVerifyPayload,
} from "./payment.types";

// 1. Order Summary
export async function getOrderSummaryApi(
  type: string,
  id: string
) {
  const res = await api.get<OrderSummaryResponse>(
    `/api/v1/${type}/${id}/order-summary`
  );
  return res.data;
}

// 2. Coupon Apply
export async function applyCouponApi(
  type: string,
  id: string,
  payload: CouponApplyPayload
) {
  const res = await api.post<OrderSummaryResponse>(
    `/api/v1/${type}/${id}/coupon/apply`,
    payload
  );
  return res.data;
}

// 3. Register (creates Razorpay order)
export async function registerApi(
  type: string,
  id: string,
  payload?: { coupon_code?: string }
) {
  const res = await api.post<RegisterResponse>(
    `/api/v1/${type}/${id}/register`,
    payload || {}
  );
  return res.data;
}

// 4. Payment Verify (ask backend team for exact endpoint)
export async function verifyPaymentApi(payload: PaymentVerifyPayload) {
  const res = await api.post(
    "/api/v1/events/payment/verify",
    payload
  );
  return res.data;
}