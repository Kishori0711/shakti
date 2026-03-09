export type NotificationType =
  | "mentor"
  | "course"
  | "event"
  | "payment"
  | "content"
  | "recommendation";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  subtitle: string;
  timeLabel: string;
  createdAtLabel: string;
  unread?: boolean;

  // Detail data
  detailText: string;
  info?: { label: string; value: string }[];
  actions?: { label: string; variant: "primary" | "secondary" }[];
};

export const NOTIFICATIONS: Notification[] = [
  {
    id: "mentor-session-confirmed",
    type: "mentor",
    title: "Mentor Session Confirmed",
    subtitle: "Your session with Ananya Kapoor is scheduled for 20 Feb, 6:00 PM IST.",
    timeLabel: "2 min ago",
    createdAtLabel: "Monday, 2 February 2026, 04:12 PM",
    unread: true,
    detailText: "Your mentoring session has been successfully scheduled.",
    info: [
      { label: "Mentor", value: "Ananya Kapoor" },
      { label: "Topic", value: "Career Guidance & Growth Strategy" },
      { label: "Date", value: "20 February 2026" },
      { label: "Time", value: "6:00 PM IST" },
      { label: "Duration", value: "60 Minutes" },
      { label: "Format", value: "Live Online (Video Call)" },
    ],
    actions: [
      { label: "Join Session", variant: "primary" },
      { label: "Reschedule", variant: "secondary" },
      { label: "Contact Support", variant: "secondary" },
    ],
  },
  {
    id: "course-progress-reminder",
    type: "course",
    title: "Course Progress Reminder",
    subtitle: "Continue learning Starting Your Business Journey. Lesson 5 is waiting.",
    timeLabel: "2 hours ago",
    createdAtLabel: "Monday, 2 February 2026, 12:10 PM",
    unread: true,
    detailText: "You’re doing great. Continue your course to stay on track with your goals.",
    info: [
      { label: "Course", value: "Starting Your Business Journey" },
      { label: "Next Lesson", value: "Lesson 5" },
    ],
    actions: [{ label: "Continue Course", variant: "primary" }],
  },
  {
    id: "event-reminder",
    type: "event",
    title: "Event Reminder",
    subtitle:
      "Your event Starting Your Business Journey — Live Workshop starts tomorrow at 5:00 PM IST.",
    timeLabel: "Yesterday",
    createdAtLabel: "Sunday, 1 February 2026, 06:30 PM",
    unread: false,
    detailText: "Reminder: Your workshop is scheduled soon.",
    info: [
      { label: "Event", value: "Starting Your Business Journey — Live Workshop" },
      { label: "Start Time", value: "Tomorrow, 5:00 PM IST" },
      { label: "Mode", value: "Live Online" },
    ],
    actions: [{ label: "View Event", variant: "primary" }],
  },
  {
    id: "payment-successful",
    type: "payment",
    title: "Payment Successful",
    subtitle: "Your payment of ₹1,399 was successful.",
    timeLabel: "3 Days ago",
    createdAtLabel: "Friday, 30 January 2026, 02:44 PM",
    unread: false,
    detailText: "Your payment was processed successfully.",
    info: [
      { label: "Amount", value: "₹1,399" },
      { label: "Status", value: "Successful" },
    ],
    actions: [{ label: "View Receipt", variant: "primary" }],
  },
  {
    id: "new-content-added",
    type: "content",
    title: "New Content Added",
    subtitle: "New lessons added to Career Growth for Professionals.",
    timeLabel: "05 Jan",
    createdAtLabel: "Monday, 5 January 2026, 10:05 AM",
    unread: false,
    detailText: "New lessons are available. Check them out when you’re ready.",
    info: [{ label: "Program", value: "Career Growth for Professionals" }],
    actions: [{ label: "Open Content", variant: "primary" }],
  },
  {
    id: "mentor-recommendation",
    type: "recommendation",
    title: "Mentor Recommendation",
    subtitle: "A new mentor matches your career goals.",
    timeLabel: "28 Dec",
    createdAtLabel: "Sunday, 28 December 2025, 09:20 AM",
    unread: false,
    detailText: "We found a mentor that fits your goals. Want to connect?",
    actions: [{ label: "View Mentor", variant: "primary" }],
  },
  
];