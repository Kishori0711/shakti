"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/home");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-orange-50 via-white to-orange-100 px-6 text-center">

      {/* 404 text */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[120px] font-black text-primary-500 leading-none"
      >
        404
      </motion.h1>

      {/* message */}
      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-2xl font-bold text-gray-800"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-2 max-w-md text-gray-500"
      >
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </motion.p>

      {/* button */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 relative z-10"
      >
        <button
          onClick={handleGoHome}
          className="rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-600 transition cursor-pointer"
        >
          Go Back Home
        </button>
      </motion.div>

      {/* floating animation circle */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-20 h-40 w-40 rounded-full bg-orange-300/40 blur-2xl pointer-events-none"
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-20 right-20 h-32 w-32 rounded-full bg-orange-200/40 blur-2xl pointer-events-none"
      />
    </div>
  );
}
