'use client';

import React, { useState } from 'react';
import Image from 'next/image';
interface JoinCommunityCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  whatsappLink?: string;
  onJoinClick?: () => void;
}

const JoinCommunityCard: React.FC<JoinCommunityCardProps> = ({
  title = 'Stay Connected',
  description = 'Join our WhatsApp community for updates & discussions.',
  buttonText = 'Join Now',
  whatsappLink = 'https://chat.whatsapp.com/your-link',
  onJoinClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onJoinClick) {
      onJoinClick();
    } else {
      window.open(whatsappLink, '_blank');
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-gradient-to-br 
                 from-green-500 via-green-600 to-emerald-700 
                 p-3 shadow-md transition-all duration-300 
                 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-white/5 blur-xl" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-sm font-bold text-white leading-tight">
          {title}
        </h3>

        <p className="mt-1 text-[11px] leading-snug text-white/90">
          {description}
        </p>

        <button
          onClick={handleClick}
          className={`
            mt-3 w-full inline-flex items-center justify-center gap-2
            rounded-lg bg-white px-3 py-2 text-xs font-semibold 
            text-green-600 transition-all duration-300
            hover:bg-green-50 active:scale-95
            ${isHovered ? 'shadow-md' : 'shadow-sm'}
          `}
        >
         <Image
            src={'/Mask group.svg'}
            alt="Welcome"
            width={20}
            height={20}
            className="object-contain"
            priority
          />

          {buttonText}
        </button>
      </div>

      {/* Shine effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                        via-white/10 to-transparent animate-pulse rounded-xl" />
      )}
    </div>
  );
};

export default JoinCommunityCard;