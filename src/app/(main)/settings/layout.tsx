import SettingSidebar from "@/components/setting/SettingsNav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="
        min-w-0 rounded-2xl bg-white
        min-h-[calc(100dvh-100px)]
      "
    >
      <div className="flex min-h-full flex-col gap-3 lg:flex-row">
        <div className="shrink-0 rounded-2xl bg-white p-2 lg:w-56 lg:p-3">
          <SettingSidebar />
        </div>

        <div className="min-w-0 flex-1 rounded-2xl bg-white p-4 md:p-5">
          {children}
        </div>
      </div>
    </section>
  );
}