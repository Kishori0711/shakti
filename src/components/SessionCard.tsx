"use client";

import Image from "next/image";
import React from "react";
import { ClockFading, Hourglass, CalendarDays, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuBadgeCheck } from "react-icons/lu";

type SessionCardProps = {
  name: string;
  role: string;
  image: string;
  duration: string;
  time: string;
  date: string;
  isLive?: boolean;
  onVideoCall?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
};

const SessionCard: React.FC<SessionCardProps> = ({
  name,
  role,
  image,
  duration,
  time,
  date,
  isLive,
  onVideoCall,
  onReschedule,
  onCancel,
}) => {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-3 hover:shadow-md transition h-full">
      {/* USER INFO */}
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight flex items-center gap-1">
            <span className="truncate">{name}</span>
            {/* <BadgeCheck className="text-primary-400 shrink-0" size={16} /> */}
            <LuBadgeCheck size={18} className="text-white fill-primary-400" />
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{role}</p>
          <Button
            variant="link"
            size="xs"
            className="p-0 h-auto text-xs text-gray-600 hover:text-primary-400 mt-0.5"
          >
            View details →
          </Button>
        </div>
      </div>

      {/* ACTIONS ROW */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Button
          onClick={onVideoCall}
          disabled={!isLive}
          size="sm"
          className={`h-9 px-4 text-xs font-medium text-white rounded-lg cursor-pointer ${
            isLive
              ? "bg-primary-500 hover:bg-primary-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLive ? "Join Session" : "Not Live"}
        </Button>

        <div className="flex gap-3 text-xs">
          <Button
            onClick={onReschedule}
            variant="link"
            size="xs"
            className="p-0 h-auto text-xs text-green-500 hover:text-green-600"
          >
            Reschedule
          </Button>
          <Button
            onClick={onCancel}
            variant="link"
            size="xs"
            className="p-0 h-auto text-xs text-red-500 hover:text-red-600"
          >
            Cancel
          </Button>
        </div>
      </div>

      {/* BOTTOM INFO — pushed to bottom */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 bg-gray-100 px-3 py-2.5 rounded-xl text-xs text-gray-700 mt-auto">
        <div className="flex items-center gap-1.5">
          <Hourglass size={14} className="shrink-0" />
          <span className="font-medium">{duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ClockFading size={14} className="shrink-0" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays size={14} className="shrink-0" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
