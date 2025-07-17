import React, { FC, ReactNode, memo } from "react";
import { SidebarProvider } from "shared/shadcn/ui/sidebar";

import { Toaster } from "shared/shadcn/ui/sonner";
import BreadCrumbs from "./ui/Header/lib/BreadCrumbs";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "14rem",
          "--sidebar-width-mobile": "14rem",
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col min-h-screen w-full">
        <div className="mx-auto w-full">
          <BreadCrumbs />

          {children}
        </div>
        <Toaster
          richColors
          closeButton
          position="top-center"
          expand={false}
          className="z-80"
        />
      </div>
    </SidebarProvider>
  );
};

export default memo(Layout);
