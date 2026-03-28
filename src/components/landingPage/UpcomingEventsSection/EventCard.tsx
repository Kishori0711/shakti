import Image from "next/image";
import Link from "next/link";
import { HiOutlineCalendarDays, HiOutlineClock } from "react-icons/hi2";

export type EventCardProps = {
  id:string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  date: string;
  time: string;
  href: string; // booking/details link
  ctaLabel?: string;
};

export default function EventCard({
  imageSrc,
  imageAlt,
  title,
  date,
  time,
  href,
  ctaLabel = "Book Your Spot",
}: EventCardProps) {
  return (
    <div className="min-w-[270px] max-w-[270px] rounded-2xl bg-white p-4 shadow-[0_10px_25px_rgba(0,0,0,0.06)] ring-1 ring-zinc-100 sm:min-w-[290px] sm:max-w-[290px]">
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>

      <h3 className="mt-4 line-clamp-2 text-sm font-semibold text-zinc-900">
        {title}
      </h3>

      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
        <span className="inline-flex items-center gap-1.5">
          <HiOutlineCalendarDays className="h-4 w-4 text-primary-400" />
          {date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <HiOutlineClock className="h-4 w-4 text-primary-400" />
          {time}
        </span>
      </div>

      <Link
        href={href}
        className="mt-4 block w-full rounded-lg bg-primary-400 py-2.5 text-center text-xs font-semibold text-white hover:bg-orange-600"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}