import type { ReactNode } from "react";

type Props = {
  stories: ReactNode;
  feed: ReactNode;
  sidebar: ReactNode;
};

export default function Layout({ stories, feed, sidebar }: Props) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="mx-auto w-full px-1 py-2">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
          {/* LEFT */}
          <div className="min-w-0 space-y-1">
            <div>{stories}</div>
            <main className="space-y-6">{feed}</main>
          </div>

          {/* RIGHT */}
          <aside className="hidden min-w-0 w-full self-start lg:sticky lg:top-4 lg:block">
            {sidebar}
          </aside>
        </div>
      </div>
    </div>
  );
}