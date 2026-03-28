import TrustedCard from "./TrustedCard";

const CARDS = [
  {
    imageSrc: "/landingPage/truestedCard/img1.png",
    imageAlt: "Learn with direction",
    title: "Learn with direction",
    description:
      "Explore structured courses and recommended learning paths that match career stage, industry, and goals.",
  },
  {
    imageSrc: "/landingPage/truestedCard/img2.png",
    imageAlt: "Connect with mentors",
    title: "Connect with mentors",
    description:
      "Book one-time sessions or packs with mentors who fit the user's actual objective, not random categories.",
  },
  {
    imageSrc: "/landingPage/truestedCard/img3.png",
    imageAlt: "Stay supported daily",
    title: "Stay supported daily",
    description:
      "Use AI Companion for confidence, emotional balance, mindfulness, and work-life support.",
  },
];

export default function TrustedSection() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-full px-4 lg:px-16">
        <h2 className="text-center text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
          Trusted by 20,000+ Women Worldwide
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {CARDS.map((c) => (
            <TrustedCard
              key={c.title}
              imageSrc={c.imageSrc}
              imageAlt={c.imageAlt}
              title={c.title}
              description={c.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}