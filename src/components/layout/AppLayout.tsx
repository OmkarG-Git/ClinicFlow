// "use client";

// import { ReactNode } from "react";

// import { Sidebar } from "./Sidebar";
// import { Navbar } from "./Navbar";
// import { SidebarProvider, useSidebar } from "./SidebarProvider";

// import { Navigation } from "@/types/navigation";
// import { CurrentUser } from "@/types/current-userType";

// interface AppLayoutProps {
//   children: ReactNode;
//   navigation: Navigation[];
//   sidebarTitle: string;
//   pageTitle: string;
//   user: CurrentUser
// }

// function LayoutContent({
//   children,
//   navigation,
//   sidebarTitle,
//   pageTitle,
//   user,
// }: AppLayoutProps) {
//   const { collapsed } = useSidebar();

//   return (
//     <div className="min-h-screen">
//       {/* Sidebar with fixed positioning */}
//       <Sidebar
//         title={sidebarTitle}
//         navigation={navigation}
//         user={user}
//       />

//       {/* Main content wrapper */}
//       <div 
//         className={`
//           flex flex-col h-screen
//           transition-margin duration-300 ease-in-out
//           ${collapsed ? 'ml-16' : 'ml-64'}
//         `}
//       >
//         {/* Navbar - fixed at top */}
//         <main className="flex-1 overflow-y-auto ">
//         <Navbar title={pageTitle} user={user} />

//         {/* Scrollable content area */}
//           <div className="mx-auto max-w-7xl p-6">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export function AppLayout(props: AppLayoutProps) {
//   return (
//     <SidebarProvider>
//       <LayoutContent {...props} />
//     </SidebarProvider>
//   );
// }



"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { SidebarProvider, useSidebar } from "./SidebarProvider";
import { MobileBottomNav } from "./MobileBottomNav";
import { MoreSideSheet } from "./MoreSideSheet";
import { Navigation } from "@/types/navigation";
import { CurrentUser } from "@/types/current-userType";

interface AppLayoutProps {
  children: ReactNode;
  navigation: Navigation[];
  sidebarTitle: string;
  pageTitle: string;
  user: CurrentUser;
}

function LayoutContent({
  children,
  navigation,
  sidebarTitle,
  pageTitle,
  user,
}: AppLayoutProps) {
  const { collapsed } = useSidebar();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainNavItems = navigation.slice(0, 4); // Show first 4 items in bottom nav
  const moreNavItems = navigation.slice(4); // Rest go in "More" section

  return (
    <div className="min-h-screen">
      {/* Sidebar with fixed positioning - hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar
          title={sidebarTitle}
          navigation={navigation}
          user={user}
        />
      </div>

      {/* Main content wrapper */}
      <div 
        className={`
          flex flex-col h-screen
          transition-margin duration-300 ease-in-out
          ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}
        `}
      >
        {/* Navbar - fixed at top */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Navbar title={pageTitle} user={user} />

          {/* Scrollable content area */}
          <div className="mx-auto max-w-7xl lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation - visible only on mobile */}
      <div className="lg:hidden">
        <MobileBottomNav 
          navigation={mainNavItems} 
          onMoreClick={() => setIsMoreOpen(true)}
        />
      </div>

      {/* More Side Sheet */}
      <MoreSideSheet 
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        navigation={moreNavItems}
      />
    </div>
  );
}

export function AppLayout(props: AppLayoutProps) {
  return (
    <SidebarProvider>
      <LayoutContent {...props} />
    </SidebarProvider>
  );
}