import { FiStar, FiThumbsUp } from "react-icons/fi";

type ActivityItem = {
  text: string;
  when: string;
  icon: React.ComponentType<{ className?: string }>;
};

const items: ActivityItem[] = [
  {
    text: "New mentor available in your industry",
    when: "2 hr",
    icon: FiThumbsUp,
  },
  {
    text: "You're eligible for incubation support",
    when: "Yesterday",
    icon: FiStar,
  },
  {
    text: "New content added for leadership skills",
    when: "2 Days",
    icon: FiStar,
  },
];

export default function RecentActivity() {
  return (
    <section className="w-full rounded-2xl bg-card p-6 shadow-sm  ring-border bg-white">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-black text-foreground">
          Recent Activity
        </h3>

        <button
          type="button"
          className="text-sm font-black text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <ul className="space-y-4">
        {items.map((a) => {
          const Icon = a.icon;

          return (
            <li key={a.text} className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <span className="mt-0.5 text-primary">
                  <Icon className="h-4 w-4" />
                </span>

                <p className="min-w-0 text-sm font-medium leading-snug text-foreground">
                  {a.text}
                </p>
              </div>

              <span className="shrink-0 pt-0.5 text-xs text-muted-foreground">
                {a.when}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}