import Image from "next/image";

type Props = {
  name: string;
  role: string;
  avatar: string;
  email?: string;
  phone?: string;
};

export default function EventSpeaker({
  name,
  role,
  avatar,
 
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h3 className="mb-3 font-semibold">Speaker</h3>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
         
        </div>
      </div>
    </div>
  );
}