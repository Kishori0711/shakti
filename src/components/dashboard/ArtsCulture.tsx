import { FiClock, FiHeart } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";

type ArtsItem = {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  minutes: number;
  likes: number;
  image: string;
};

const items: ArtsItem[] = [
  {
    id: 1,
    title: "The Art of Madhubani Painting",
    subtitle: "Ancient art form empowering rural women",
    tag: "Arts",
    minutes: 5,
    likes: 189,
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Indra Nooyi: Leadership Lessons",
    subtitle: "How she led PepsiCo with grace and grit",
    tag: "Leadership",
    minutes: 5,
    likes: 189,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "She believed she could, so she did",
    subtitle: "Daily inspiration for your journey",
    tag: "Courage",
    minutes: 5,
    likes: 189,
    image:
      "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/english-betterindia/media/post_attachments/uploads/2024/03/women-empowerment-8-1710846585.jpg",
  },
];

const ArtsCulture = () => {
  return (
    <section className="w-full rounded-2xl bg-card p-6 shadow-sm  ring-border bg-white">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-black text-foreground">
          Arts & Culture
        </h2>

        <button className="text-sm font-black text-primary hover:underline">
          Show All (8)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group min-w-0">
            <div className="relative overflow-hidden rounded-2xl">
              
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
                {item.tag}
              </span>

              <button
                className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full
                           bg-primary text-primary-foreground shadow-md
                           transition-colors hover:bg-primary-900"
                aria-label="Play video"
              >
                <BsPlayFill className="text-xl" />
              </button>
            </div>

            <h3 className="mt-4 text-sm font-semibold text-foreground">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {item.subtitle}
            </p>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <FiClock /> {item.minutes} min read
              </span>

              <span className="flex items-center gap-1.5">
                <FiHeart /> {item.likes}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ArtsCulture;