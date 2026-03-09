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


"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
const routes = [
  { path: "/learn/explore", title: "Explore" },
  { path: "/learn/my-courses", title: "My Courses" },
  { path: "/mentors", title: "Mentors" },
  { path: "/events", title: "Events" },
  { path: "/artsCulture", title: "Arts Culture" },
  { path: "/social", title: "Social" },
  { path: "/notifications", title: "Notifications" },
  { path: "/", title: "Dashboard" },
];

  const pageTitle =
  routes.find((route) => pathname.startsWith(route.path))?.title ||
  "Dashboard";

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div className="h-full flex gap-4 p-4 overflow-hidden">

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