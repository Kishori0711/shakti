export type PurchaseStatus = "Ongoing" | "Completed" | "Cancelled";
export type InvoiceType = "receipt" | "unavailable";

export interface Purchase {
  id: string;
  name: string;
  image: string;
  date: string;
  totalPrice: string;
  status: PurchaseStatus;
  invoice: InvoiceType;
}

export const COURSES: Purchase[] = [
  {
    id: "c1",
    name: "Strategic clarity for long-term career growth",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&h=80&fit=crop",
    date: "Mar 7, 2026",
    totalPrice: "₹2,423",
    status: "Ongoing",
    invoice: "unavailable",
  },
  {
    id: "c2",
    name: "Strategic clarity for long-term career growth",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=80&h=80&fit=crop",
    date: "Mar 7, 2026",
    totalPrice: "₹519",
    status: "Completed",
    invoice: "unavailable",
  },
  {
    id: "c3",
    name: "Strategic clarity for long-term career growth",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=80&h=80&fit=crop",
    date: "Mar 7, 2026",
    totalPrice: "₹0",
    status: "Completed",
    invoice: "receipt",
  },
  {
    id: "c4",
    name: "Strategic clarity for long-term career growth",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop",
    date: "Mar 7, 2026",
    totalPrice: "₹0",
    status: "Completed",
    invoice: "receipt",
  },
  {
    id: "c5",
    name: "Strategic clarity for long-term career growth",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=80&h=80&fit=crop",
    date: "Mar 7, 2026",
    totalPrice: "₹0",
    status: "Completed",
    invoice: "receipt",
  },
];

export const MENTOR_SESSIONS: Purchase[] = [
  {
    id: "m1",
    name: "One-on-one mentorship with Rahul Sharma",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    date: "Apr 2, 2026",
    totalPrice: "₹1,200",
    status: "Completed",
    invoice: "receipt",
  },
  {
    id: "m2",
    name: "Career guidance session with Priya Patel",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    date: "Apr 5, 2026",
    totalPrice: "₹800",
    status: "Ongoing",
    invoice: "unavailable",
  },
  {
    id: "m3",
    name: "Resume review with Amit Verma",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    date: "Mar 28, 2026",
    totalPrice: "₹0",
    status: "Completed",
    invoice: "receipt",
  },
];

export const EVENT_TICKETS: Purchase[] = [
  {
    id: "e1",
    name: "Tech Summit 2026 — Bangalore",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=80&fit=crop",
    date: "May 10, 2026",
    totalPrice: "₹3,500",
    status: "Ongoing",
    invoice: "unavailable",
  },
  {
    id: "e2",
    name: "Design Thinking Workshop — Delhi",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=80&h=80&fit=crop",
    date: "Apr 15, 2026",
    totalPrice: "₹1,000",
    status: "Completed",
    invoice: "receipt",
  },
];

export const TABS = [
  { key: "courses", label: "Courses" },
  { key: "mentor-sessions", label: "Mentor Sessions" },
  { key: "event-tickets", label: "Event Tickets" },
] as const;

export type TabKey = (typeof TABS)[number]["key"];

export function getDataForTab(tab: TabKey): Purchase[] {
  switch (tab) {
    case "courses":
      return COURSES;
    case "mentor-sessions":
      return MENTOR_SESSIONS;
    case "event-tickets":
      return EVENT_TICKETS;
  }
}