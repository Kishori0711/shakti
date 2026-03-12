import type { ReactNode } from "react";
import Image from "next/image";
import logo from "../../assets/logo/Shakti 2047 Final Logo CC.png";
import RightGroupImg from "../../assets/auth/group-women-saris-with-their-arms-crossed 1.png";
import RecaptchaMount from "../../components/auth/RecaptchaMount";
import { Suspense } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-2">
      <div className="w-full lg:max-w-5xl h-[98vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col p-8 relative">
          {/* Logo (TOP LEFT) */}
          <div className="absolute top-2 left-0  h-16 w-32 ">
            <Image
              src={logo}
              width={200}
              height={56}
              alt="Shakti"
              priority
              className="object-contain" 
            />
          </div>

          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
             <Suspense fallback={<div className="text-center">Loading...</div>}>
                {children}
              </Suspense>
              <RecaptchaMount />
            </div>
          </div>
 
          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-4">
            © 2026 Shakti 2047. All rights reserved.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden lg:flex w-1/2 p-4">
          <div className="w-full h-full bg-primary-500 rounded-2xl text-white flex flex-col px-10 pt-12 pb-0 overflow-hidden">
            <div>
              <h1 className="text-3xl font-bold mb-3">Welcome to Shakti 2047</h1>
              <p className="text-purple-100 text-sm mb-3 leading-relaxed">
                A nationwide initiative to support and uplift women through learning,
                mentorship, and community.
              </p>
              <p className="text-purple-200 text-xs leading-relaxed">
                We&apos;ll take a few quick steps to understand you better and customize your journey.
              </p>
            </div>

            <div className="mt-auto relative flex justify-center ">
              <Image
                src={RightGroupImg}
                alt="Shakti"
                className="pointer-events-none select-none block absolute inset-x-0 -bottom-6 mx-auto w-full max-w-4xl object-contain object-bottom "
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}