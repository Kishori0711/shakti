import Image from "next/image";

type TrustedCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
};

export default function TrustedCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: TrustedCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-zinc-100">
      <div className="p-4">
        <div className="relative h-32 lg:h-56 w-full overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="pt-5 pb-3">
          <h3 className="text-[15px] font-semibold text-zinc-900">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
        </div>
      </div>
    </div>
  );
}