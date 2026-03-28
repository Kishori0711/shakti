import Image from "next/image";

const TAGS = ["Career Growth", "Career Switch", "Entrepreneurship", "AI Support"] as const;

const STATS = [
  { value: "50K+", text: "Users building clarity, skills, and career momentum." },
  { value: "3.2K+", text: "Courses across multiple learning and career categories." },
  { value: "600+", text: "Mentors and experts supporting real growth journeys." },
] as const;

export default function AboutSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-full px-4 lg:px-16">
        {/* md se 12-col grid */}
        <div className="grid gap-2 md:grid-cols-12 md:items-start lg:items-stretch">
          {/* Left: Content (md par full width, lg par left) */}
          <div className="md:col-span-12 lg:col-span-6 ">
            <h2 className="text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
              About Us
            </h2>

            <div className="mt-6 space-y-6 text-sm leading-7 text-zinc-500  lg:text-[clamp(10px,1.1vw,19px)]">
              <p>
                Shakti 2047 is built to help women move from uncertainty to
                opportunity. It is Asia’s first comprehensive Digital and AI
                platform created for women aged 18 and above who want to build
                meaningful futures with clarity, confidence, and direction.
              </p>

              <p>
                The platform connects women to learning and mentoring
                opportunities, AI support, Arts &amp; Culture, and Legal Rights
                information and pathways. It is designed to prepare users for
                rewarding careers, leadership journeys, CXO positions, and Board
                Director roles.
              </p>

              <p>
                Shakti 2047 is AI-enabled and makes it easy to move between
                digital and physical interaction forums, creating a seamless
                experience that opens the door to unlimited opportunities for
                the future.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-medium text-primary-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>


<div className="md:col-span-7 lg:col-span-3 mt-6 lg:mt-0">
  <div className="relative mx-auto w-full max-w-[clamp(350px,25vw,400px)] overflow-hidden rounded-3xl bg-zinc-100 aspect-4/5  lg:h-full">
    <Image
      src="/landingPage/about/img.webp"
      alt="About Shakti 2047"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 380px"
    />
  </div>
</div>

          {/* Right: Stats (md par image ke right me) */}
          <div className="md:col-span-5 lg:col-span-3 md:pl-6 lg:pl-4 mt-6 lg:mt-0">
            {/* md par spacing thodi kam, lg par jaisi aapki thi */}
            <div className="space-y-10 lg:space-y-28">
              {STATS.map((s) => (
                <div key={s.value}>
                  <div className="text-3xl font-semibold tracking-tight text-zinc-900">
                    {s.value}
                  </div>
                  <p className="mt-2 text-sm leading-5 text-zinc-500">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}