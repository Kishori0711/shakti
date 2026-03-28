import Image from "next/image";

type Props = {
  image: string;
  event_type?: string | null;
  title: string;
  description: string;
  badgeText?: string;
};

export default function EventHero({
  image,
  event_type,
  title,
  description,
  badgeText,
}: Props) {
  return (
    <div className="space-y-4 rounded-2xl border border-border bg-white p-5">
      <div className="relative h-100 w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {badgeText && (
        <span className="rounded-md bg-primary-100 px-2 py-1 text-xs text-primary-700">
          {badgeText}
        </span>
      )}

      <span className="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
        {event_type}
      </span>

      <h1 className="text-2xl font-semibold">{title}</h1>

      <p className="text-sm">{description}</p>
    </div>
  );
}