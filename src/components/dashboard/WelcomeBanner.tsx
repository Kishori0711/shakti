'use client';  // ← ADD THIS!

import Image from "next/image";
import Welcome from "../../assets/desbord/wellcomeimg.png"

type Props = {
  userName?: string;
};

export default function WelcomeBanner({ userName = "Priya" }: Props) {
  return (
    <section className="relative h-full w-full overflow-hidden rounded-2xl border border-zinc-200 bg-[#FFF1D6] p-4">
      <div className="flex h-full items-center">

        {/* LEFT */}
        <div className="min-w-0 flex-1">
          <h1 className="text-[clamp(20px,2.1vw,28px)] font-black leading-tight">
            Welcome back, {userName}
          </h1>

          <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-600">
            Heres what matters most for your growth right now.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 ">
              Start My Onboarding
            </button>

            <button className="rounded-xl border border-primary-500 bg-white px-5 py-2.5 text-sm font-semibold text-primary-500 transition-colors hover:bg-gray-50">
              Explore How It Works
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative hidden h-full flex-[0_0_38%] lg:block">

          {/* orange circle */}
          <div className="absolute right-1 top-48 h-[clamp(220px,22vw,320px)] w-[clamp(200px,20vw,320px)] -translate-y-1/2 rounded-full bg-primary-500" />

          {/* image */}
          <Image
            src={Welcome}
            alt="Welcome"
            width={300}
            height={260}
            className="absolute right-14 h-[clamp(210px,26vh,280px)] w-auto object-contain"
            priority
          />

          {/* sparkles */}
          <div className="absolute right-8 top-6">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M22 4l2.6 10.2L35 17l-10.4 2.8L22 30l-2.6-10.2L9 17l10.4-2.8L22 4z"
                fill="#F6A623"
                opacity="0.9"
              />
              <path
                d="M35 25l1.6 6.2L43 33l-6.4 1.8L35 41l-1.6-6.2L27 33l6.4-1.8L35 25z"
                fill="#FF6B6B"
                opacity="0.9"
              />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}

// 'use client'

// import Image from "next/image"
// import Welcome from "../../assets/desbord/wellcomeimg.png"

// type Props = {
//   userName?: string
// }

// const WelcomeBanner = ({ userName = "Priya" }: Props) => {
//   return (
//     <section className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-primary-50 p-4">
//       <div className="flex h-full items-center">

//         {/* LEFT */}
//         <div className="min-w-0 flex-1">

//           <h1 className="text-[clamp(20px,2.1vw,28px)] font-black leading-tight text-zinc-900">
//             Welcome back, {userName}
//           </h1>

//           <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-600">
//             Here’s what matters most for your growth right now.
//           </p>

//           <div className="mt-4 flex flex-wrap gap-3">

//             <button className="rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90">
//               Start My Onboarding
//             </button>

//             <button className="rounded-xl border border-primary/40 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10">
//               Explore How It Works
//             </button>

//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="relative hidden h-full flex-[0_0_38%] lg:block">

//           {/* circle */}
//           <div className="absolute right-1 top-48 h-[clamp(220px,22vw,320px)] w-[clamp(200px,20vw,320px)] -translate-y-1/2 rounded-full bg-primary/30" />

//           {/* image */}
//           <Image
//             src={Welcome}
//             alt="Welcome"
//             width={300}
//             height={260}
//             priority
//             className="absolute right-14 h-[clamp(210px,26vh,280px)] w-auto object-contain"
//           />

//           {/* sparkles */}
//           <div className="absolute right-8 top-6">
//             <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
//               <path
//                 d="M22 4l2.6 10.2L35 17l-10.4 2.8L22 30l-2.6-10.2L9 17l10.4-2.8L22 4z"
//                 className="fill-primary opacity-90"
//               />
//               <path
//                 d="M35 25l1.6 6.2L43 33l-6.4 1.8L35 41l-1.6-6.2L27 33l6.4-1.8L35 25z"
//                 className="fill-primary/70"
//               />
//             </svg>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default WelcomeBanner