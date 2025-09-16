import type { ReactNode } from "react";

import AppHeader from "./header";
import AppFooter from "./footer";

interface Props {
  children: ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
}
