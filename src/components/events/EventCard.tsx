// "use client";

// import Image from "next/image";
// import { Calendar } from "lucide-react";
// import { useRouter } from "next/navigation";

// type Event = {
//   id: string;
//   title: string;
//   image: string;
//   date: string;
//   mentorName: string;
//   mentorRole: string;
//   mentorAvatar: string;
//   price: number;
// };

// type Props = {
//   event: Event;
//   onClick?: () => void;
// };

// const EventCard: React.FC<Props> = ({ event, onClick }) => {
//   const router = useRouter();
//   return (
//     <div
//       onClick={onClick}
//       className="bg-white border border-border rounded-2xl hover:shadow-md transition p-4"
//     >
//       {/* IMAGE */}
//       <div className="relative h-52 w-full overflow-hidden rounded-lg mb-4 group cursor-pointer">

//         <Image
//           src={event.image}
//           alt={event.title}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-300"
//         />

//         {/* DATE */}
//         <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 text-white px-3 py-1 rounded-lg text-xs">
//           <Calendar size={14} />
//           {event.date}
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="space-y-3">
//         {/* TITLE */}
//         <h3 className="font-medium text-foreground text-base line-clamp-2">
//           {event.title}
//         </h3>

//         {/* MENTOR */}
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full overflow-hidden">
//             <Image
//               src={event.mentorAvatar}
//               alt={event.mentorName}
//               width={36}
//               height={36}
//               className="object-cover"
//             />
//           </div>

//           <div>
//             <p className="text-sm font-semibold">{event.mentorName}</p>
//             <p className="text-xs text-muted-foreground">{event.mentorRole}</p>
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <hr className="border-border" />

//         {/* FOOTER */}
//         <div className="flex items-center justify-between">
//           <span className="text-primary-600 font-semibold text-base">
//             {event.price === 0 ? "Free" : `₹${event.price}`}
//           </span>

//           <button
//             onClick={() => router.push(`/events/${event.id}`)}
//             className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;

"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  image: string;
  date: string;
  mentorName: string;
  mentorRole: string;
  mentorAvatar: string;
  price: number;
};

type Props = {
  event: Event;
};

const EventCard: React.FC<Props> = ({ event }) => {
  const router = useRouter();

  const openDetails = () => {
    router.push(`/events/upcoming-events/${event.id}`);
  };

  return (
    <div
      onClick={openDetails}
      className="cursor-pointer rounded-2xl border border-border bg-white p-4 transition hover:shadow-md"
    >
      <div className="group relative mb-4 h-52 w-full overflow-hidden rounded-lg">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1 text-xs text-white">
          <Calendar size={14} />
          {event.date}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="line-clamp-2 text-base font-medium text-foreground">
          {event.title}
        </h3>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 overflow-hidden rounded-full">
            <Image
              src={event.mentorAvatar}
              alt={event.mentorName}
              width={36}
              height={36}
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold">{event.mentorName}</p>
            <p className="text-xs text-muted-foreground">{event.mentorRole}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-primary-600">
            {event.price === 0 ? "Free" : `₹${event.price}`}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openDetails();
            }}
            className="cursor-pointer rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
