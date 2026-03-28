// import Image from "next/image";
// import { useTranslation } from "@/hooks/useTranslation";

// export default function ShatiAIcard() {
//   const { t, loading } = useTranslation();

//   return (
//     <section className="relative h-full w-full overflow-hidden rounded-2xl p-5 text-white hover:shadow-sm">
//       <Image
//         src="/aiback.jpg"
//         alt="Background"
//         fill
//         priority
//         className="absolute inset-0 object-cover"
//         sizes="100%"
//       />
//       {/* Content */}
//       <div className="relative z-10 flex h-full flex-col justify-center">
//         <div className="max-w-[55%] space-y-5">
//           <div>
//             <div className="text-base font-semibold">
//               {" "}
//               {loading ? "Loading..." : t("shaktiAI")}
//             </div>

//             <p className="text-[10px] text-white/95">
//               {loading ? "Loading..." : t("yourcareerAICompanion")}
//             </p>
//           </div>

//           <button
//             type="button"
//             className="mt-3 w-fit rounded-xl bg-white px-4 py-2.5 text-sm text-black hover:bg-primary-100 transition backdrop-blur-sm"
//           >
//             {loading ? "Loading..." : t("openChat")}
//           </button>
//         </div>
//       </div>

//       {/* Right side image */}
//       <Image
//         src="/aicalling.png"
//         alt="Mentor"
//         width={80}
//         height={90}
//         priority
//         className="pointer-events-none absolute -right-4 top-4 h-[100%] w-auto max-w-none object-contain "
//       />
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

export default function ShatiAIcard() {
  const { t, loading } = useTranslation();
  const router = useRouter();

  const handleClick = () => {
    router.push("/well-being");
  };

  return (
    <section className="relative w-full overflow-hidden rounded-2xl p-4 sm:p-5 text-white shadow-sm hover:shadow-md transition-shadow min-h-41.25 sm:min-h-30">
      {/* Background Image */}
      <Image
        src="/aibacknew.png"
        alt="Background"
        fill
        priority
        className="absolute inset-0 object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full">
        <div className="max-w-[70%] sm:max-w-[60%] lg:max-w-[55%] space-y-4 sm:space-y-5">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-white">
              {loading ? "Loading..." : t("shaktiAI")}
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-white/95">
              {loading ? "Loading..." : t("yourcareerAICompanion")}
            </p>
          </div>

          {/* Button */}
          <Button
            onClick={handleClick}
            className="w-fit rounded-xl bg-white text-black hover:bg-gray-100 text-xs cursor-pointer"
          >
            {loading ? "Loading..." : t("openChat")}
          </Button>
        </div>
      </div>

      {/* Right Side AI Character Image */}
      <Image
        src="/aicalling.png"
        alt="AI Assistant"
        width={150}
        height={180}
        priority
        className="pointer-events-none absolute -right-2 sm:-right-4 top-0 h-auto w-auto max-w-none object-contain"
      />
    </section>
  );
}