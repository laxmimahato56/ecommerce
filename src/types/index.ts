import type { JSX } from "react";

export type AppRoute = {
  key: string;
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
