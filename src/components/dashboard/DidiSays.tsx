import Image from "next/image";
import Didi from "../../assets/desbord/didimg.png"
export default function DidiSays() {
  return (
    <section
      className="relative h-full w-full overflow-hidden rounded-2xl p-5 text-white shadow-xl"
      style={{
        backgroundImage: "url('/images/didi-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/15" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center">
        <div className="mt-5 max-w-[55%] space-y-5">
          <div>
            <div className="text-base font-semibold">Didi says…</div>

            <p className="text-[10px] text-white/95">
              Get instant career guidance anytime.
            </p>
          </div>

          <button
            type="button"
            className="mt-3 w-fit rounded-xl bg-white/20 px-4 py-2.5 text-sm text-white hover:bg-white/30 transition backdrop-blur-sm"
          >
            Open Chat
          </button>
        </div>
      </div>

      {/* Right side image */}
      <Image
        src={Didi}
        alt="Mentor"
        width={400}
        height={600}
        className="pointer-events-none absolute -right-10 -top-24 h-[250%] w-auto max-w-none object-contain opacity-95"
      />
    </section>
  );
}