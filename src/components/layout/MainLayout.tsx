// "use client";

// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Navbar"; 

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false); 

//   return (
//     <div className="h-screen bg-[#F5F1F0] overflow-hidden">
//       {/* outer padding same as your UI */}
//       <div className="h-full flex gap-4 p-4 overflow-hidden">
//         <Sidebar
//           open={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//           collapsed={collapsed}
//           onToggleCollapsed={() => setCollapsed((v) => !v)}
//         />

//         <div className="flex-1 flex flex-col overflow-hidden">
//           <div className="shrink-0">
//             <Header
//               title="Dashboard"
//               onMenuClick={() => setSidebarOpen(true)} 
//             />
//           </div>

//           <main className="flex-1 overflow-y-auto pt-4">
//             {children}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// export default function MainLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   const [collapsed, setCollapsed] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="h-screen bg-gray-100 overflow-hidden">

//       <div className="h-full flex gap-4 p-4 overflow-hidden">

//         {/* Sidebar */}
//         <Sidebar
//           open={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//           collapsed={collapsed}
//           onToggleCollapsed={() => setCollapsed((prev) => !prev)}
//         />

//         {/* Right section */}
//         <div className="flex-1 flex flex-col overflow-hidden">

//           {/* Header */}
//           <div className="shrink-0">
//             <Navbar
//               title="Dashboard"
//               onMenuClick={() => setSidebarOpen(true)}
//             />
//           </div>

//           {/* Page Content */}
//           <main className="flex-1 overflow-y-auto pt-4">
//             {children}
//            </main>

//         </div>
//       </div>
 
//     </div>
//   );
// }

// MainLayout.tsx

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTranslation } from "@/hooks/useTranslation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, loading } = useTranslation(); // ✅ Translation hook

  const pathname = usePathname();

  // ✅ titleKey = translation key, NOT hardcoded English
  const routes = [
    { path: "/home", titleKey: "dashboard" },
    { path: "/learn/explore", titleKey: "explore" },
    { path: "/learn/my-courses", titleKey: "myCourses" },
    { path: "/mentors", titleKey: "mentors" },
    { path: "/events", titleKey: "events" },
    { path: "/artsCulture", titleKey: "community" },
    { path: "/social", titleKey: "community" },
    { path: "/notifications", titleKey: "notifications" },
    { path: "/settings/my-profile", titleKey: "settings" },
    { path: "/settings/login-security", titleKey: "settings" },
    { path: "/settings/notifications", titleKey: "settings" },
    { path: "/settings/payments-billing", titleKey: "settings" },
    { path: "/settings/terms-policies", titleKey: "settings" },
    { path: "/settings/delete-account", titleKey: "settings" },
    { path: "/newsfeed/explore", titleKey: "explore" },
    { path: "/newsfeed/my-feed", titleKey: "myFeed" },
    { path: "/well-being", titleKey: "wellBeing" },
    { path: "/help", titleKey: "help_support" },
    { path: "/purchase-history", titleKey: "purchaseHistory" },
  ];

  // ✅ Find matching route and translate
  const matchedRoute = routes.find((route) =>
    pathname.startsWith(route.path)
  );

  const pageTitle = loading
    ? "..."
    : matchedRoute
      ? t(matchedRoute.titleKey)
      : t("dashboard");

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div className="h-full flex gap-4 p-2 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((prev) => !prev)}
        />

        {/* Right section */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="shrink-0">
            <Navbar
              title={pageTitle}
              onMenuClick={() => setSidebarOpen(true)}
            />
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto pt-4">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}