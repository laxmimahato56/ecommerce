import type { ReactNode } from "react";

import AppHeader from "./header";
import AppFooter from "./footer";

interface Props {
  children: ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="px-6 py-6 flex-1">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
      <AppFooter />
    </div>
  );
}
