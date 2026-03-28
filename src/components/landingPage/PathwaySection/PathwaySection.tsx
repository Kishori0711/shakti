import Link from "next/link";
import type { IconType } from "react-icons";
import {
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { IoIosTrendingUp } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa6";

type PathwayItem = {
  Icon: IconType;
  label: string;
  title: string;
  desc: string;
};

const ITEMS: PathwayItem[] = [
  {
    Icon: IoIosTrendingUp,
    label: "CAREER GROWTH",
    title: "For professionals who want to grow faster",
    desc: "Build stronger skills, gain mentor guidance, and move toward leadership with more clarity.",
  },
  {
    Icon: FaUserCheck,
    label: "CAREER SWITCH",
    title: "For those ready to move into a new direction",
    desc: "Identify skill gaps, follow the right learning path, and switch with more confidence.",
  },
  {
    Icon: HiOutlineRocketLaunch,
    label: "ENTREPRENEURSHIP",
    title: "For founders and aspiring builders",
    desc: "Turn ideas into action with expert support, practical learning, and clearer execution.",
  },
];

export default function PathwaySection() {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-full px-4 lg:px-16">
        <h2 className="text-center text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
          Define Your Pathway
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {ITEMS.map((it) => (
            <div key={it.label} className="text-center md:text-left">
              <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center md:mx-0">
                <it.Icon className="h-8 w-8 text-primary-500" />
              </div>

              <div className="text-sm font-semibold tracking-[0.18em] text-primary-500">
                {it.label}
              </div>

              <h3 className="mt-4 text-sm font-semibold text-zinc-900">
                {it.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-500">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/pathway"
            className="rounded-lg bg-primary-400 px-8 py-3 text-sm font-semibold text-white  hover:bg-primary-600"
          >
            Find Your Pathway
          </Link>
        </div>
      </div>
    </section>
  );
}