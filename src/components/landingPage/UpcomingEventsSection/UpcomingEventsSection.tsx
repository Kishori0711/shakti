import Link from "next/link";
import EventCard, { EventCardProps } from "./EventCard";
import { FaArrowRightLong } from "react-icons/fa6";

const EVENTS: EventCardProps[] = [
  {
    id:"1",
    imageSrc: "/landingPage/event/img1.jpg",
    imageAlt: "Workshop crowd",
    title: "Career Clarity Workshop: Find Your Next Best Step",
    date: "20 Mar 2026",
    time: "10:30 AM",
    href: "/events/career-clarity",
  },
  {
       id:"2",
    imageSrc: "/landingPage/event/img2.jpg",
    imageAlt: "People in session",
    title: "Career Switch Blueprint: Plan Your Transition Right",
    date: "20 Mar 2026",
    time: "10:30 AM",
    href: "/events/career-switch",
  },
  {
       id:"3",
    imageSrc: "/landingPage/event/img3.jpg",
    imageAlt: "Presentation screen",
    title: "Mentor-Led Growth Session for Working Professionals",
    date: "20 Mar 2026",
    time: "10:30 AM",
    href: "/events/mentor-led-growth",
  },
    {
         id:"4",
    imageSrc: "/landingPage/event/img1.jpg",
    imageAlt: "Workshop crowd",
    title: "Career Clarity Workshop: Find Your Next Best Step",
    date: "20 Mar 2026",
    time: "10:30 AM",
    href: "/events/career-clarity",
  },
  {
       id:"5",
    imageSrc: "/landingPage/event/img2.jpg",
    imageAlt: "People in session",
    title: "Career Switch Blueprint: Plan Your Transition Right",
    date: "20 Mar 2026",
    time: "10:30 AM",
    href: "/events/career-switch",
  },
  {
       id:"6",
    imageSrc: "/landingPage/event/img3.jpg",
    imageAlt: "Presentation screen",
    title: "Mentor-Led Growth Session for Working Professionals",
    date: "20 Mar 2026",
    time: "10:30 AM",
    href: "/events/mentor-led-growth",
  },
];
export default function UpcomingEventsSection() {
  return (
    <section className="bg-zinc-100 py-16">
      <div className="mx-auto max-w-full pl-4 lg:pl-16">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          {/* Left (static) */}
          <div className="lg:pt-4">
            <h2 className="text-5xl font-medium tracking-tight text-zinc-900">
              Upcoming <br /> Events
            </h2>

            <p className="mt-4 text-base leading-5 text-zinc-500">
              Explore upcoming workshops, mentor-led sessions, and opportunity
              events designed to help women build confidence, leadership
              readiness, and future pathways through practical guidance.
            </p>

            <Link
              href="/events"
              className="mt-6 flex items-center gap-3 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              More Events <FaArrowRightLong size={15} />
            </Link>
          </div>

          {/* Right (scrollable cards) */}
          <div className="overflow-hidden">
            <div className="no-scrollbar flex gap-6 overflow-x-auto pb-2 pr-2 snap-x snap-mandatory">
              {EVENTS.map((ev) => (
                <div key={ev.id} className="snap-start">
                  <EventCard {...ev} />
                </div>
              ))}
            </div>

       
          </div>
        </div>
      </div>
    </section>
  );
}