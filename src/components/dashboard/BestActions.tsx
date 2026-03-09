import { FiCalendar, FiFileText, FiUsers } from "react-icons/fi";

type ActionItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  btnText: string;
};

const actions: ActionItem[] = [
  {
    icon: FiUsers,
    title: "Book a Mentor Session",
    subtitle: "Get 1:1 Guidance Aligned To Your Goals And Industry",
    btnText: "Book Mentor",
  },
  {
    icon: FiFileText,
    title: "Explore Curated Content",
    subtitle: "Articles, Videos, And Resources Tailored To You",
    btnText: "Explore Content",
  },
  {
    icon: FiCalendar,
    title: "Discover Events",
    subtitle: "Workshops And Talks For Your Growth Stage",
    btnText: "View Events",
  },
];

const BestActions = () => {
  return (
    <section className="h-full w-full rounded-2xl bg-card p-5  ring-border bg-white">
      <h2 className="mb-4 text-base font-black text-foreground">
        Your Next Best Actions
      </h2>

      <div className="grid h-[calc(100%-2.5rem)] grid-cols-1 gap-4 lg:grid-cols-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          const isPrimary = idx === 0;

          return (
            <article
              key={idx}
              className="flex flex-col rounded-2xl border border-border bg-card p-5"
            >
              <Icon className="mb-3 text-[22px] text-primary" />

              <h3 className="text-sm font-black leading-tight text-foreground">
                {action.title}
              </h3>

              <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">
                {action.subtitle}
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  className={`w-fit rounded-xl px-4 py-2 text-sm font-semibold transition-colors
                    ${
                      isPrimary
                        ? "bg-primary text-primary-foreground hover:bg-primary-900"
                        : "border border-primary bg-background text-primary hover:bg-accent"
                    }`}
                >
                  {action.btnText}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BestActions;