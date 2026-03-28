export type OrderSummaryResponse = {
  success: boolean;
  data: {
    event: {
      id: string;
      title: string;
      banner_image: string | null;
      language: string | null;
      event_type: string | null;
      what_you_will_learn: string[] | null;
    };
    pricing: {
      original_price: number;
      discount: number;
      tax_gst: string;
      total: number;
      currency: string;
    };
    coupon: {
      code: string;
      discount: number;
    } | null;
    payment_required: boolean;
  };
};

export type CouponApplyPayload = {
  coupon_code: string;
};

export type RegisterResponse = {
  success: boolean;
  payment_required: boolean;
  message: string;
  razorpay?: {
    key: string;
    order_id: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    registration_id: string;
  };
  order_summary?: {
    original_price: number;
    discount: number;
    coupon_code: string | null;
    final_price: number;
    final_price_paise: number;
    tax_gst: string;
    currency: string;
  };
  registration_id?: string;
  order_id?: string;
};

export type PaymentVerifyPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  registration_id: string;
};