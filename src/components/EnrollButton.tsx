// components/EnrollButton.tsx
"use client";

import React, { useState } from "react";

interface EnrollButtonProps {
  text?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

const variantClasses = {
  primary:
    "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white border border-primary-600",
  secondary:
    "bg-secondary-600 hover:bg-secondary-700 active:bg-secondary-800 text-white border border-secondary-600",
  outline:
    "bg-transparent hover:bg-primary-50 active:bg-primary-100 text-primary-600 border border-primary-300 hover:border-primary-400",
};

const EnrollButton: React.FC<EnrollButtonProps> = ({
  text = "Enroll Now",
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden
        rounded-lg font-semibold
        transition-all duration-300 ease-out
        shadow-sm hover:shadow-md active:shadow-none
        disabled:opacity-60 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {/* Shimmer Effect on Hover */}
      {isHovered && !isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      )}

      {/* Content */}
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <span className="relative z-10">{text}</span>
      )}
    </button>
  );
};

export default EnrollButton;