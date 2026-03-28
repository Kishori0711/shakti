"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// import CourseImg from "@/public/globe.svg";
import CourseImg from "../../../../../../../public/globe.svg"
import OrderSummarySection from "@/components/events/OrderSummarySection";
import { useParams } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;
  const [open, setOpen] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  return (
    <div className="p-2">
      <button
        onClick={() => router.back()}
        className=" flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
       <BackButton label=" Back to Course"/>
      </button>

      <div>
        <OrderSummarySection
          item={{
            image: CourseImg.src,
            
            title: "Strategic clarity for long-term career growth",
            meta: "25 Lessons · 42 Hours",
            price: "₹1,499",
            tags: [
              { label: "Career Growth" },
              { label: "Hindi, English", variant: "secondary" },
            ],
          }}
          open={open}
          setOpen={setOpen}
          onStart={() => setOpen(false)}
          onDashboard={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
