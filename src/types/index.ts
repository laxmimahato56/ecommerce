import type { JSX } from "react";

export type AppRoute = {
  key: string;
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};
