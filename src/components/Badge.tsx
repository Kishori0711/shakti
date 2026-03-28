// components/Badge.tsx
import React from "react";
import Image from "next/image";

type IconLike = React.ReactNode | string;

type BadgeVariant = "category" | "language" | "new" | "tag" | "glass";
type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  icon?: IconLike;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  primary: "bg-primary-100 text-primary-600",
  secondary: "bg-secondary-100 text-secondary-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-orange-100 text-orange-600",
  danger: "bg-red-100 text-red-600",
  info: "bg-blue-100 text-blue-600",
};

const renderIcon = (icon?: IconLike, className = "h-4 w-4") => {
  if (!icon) return null;

  if (typeof icon === "string") {
    return (
      <Image src={icon} alt="" width={16} height={16} className={className} />
    );
  }

  return icon;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "category",
  color = "primary",
  icon,
  className = "",
}) => {
  // Base classes
  const baseClass =
    "inline-flex items-center gap-2 px-2 py-1 rounded-md font-medium text-sm transition-colors";

  // Variant specific styling
  let variantClass = "";

  switch (variant) {
    case "new":
      variantClass =
        "bg-orange-500 text-white rounded-full font-semibold text-xs px-3 py-1";
      break;
    case "category":
      variantClass =
        "bg-primary-100 backdrop-blur-md text-primary-500 rounded-full";

      break;
    case "language":
      variantClass =
        "bg-secondary-100 backdrop-blur-md text-primary-500 rounded-full";

      break;
    case "tag":
      variantClass = `${colorClasses[color]} rounded-md`;
      break;
    case "glass":
      variantClass = "bg-black/40 backdrop-blur-md text-white rounded-full";
      break;
    default:
      variantClass = colorClasses[color];
  }

  return (
    <span className={`${baseClass} ${variantClass} ${className}`}>
      {renderIcon(icon, "h-4 w-4 opacity-90")}
      {label}
    </span>
  );
};

export default Badge;
