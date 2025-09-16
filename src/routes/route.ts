import { lazy } from "react";
import type { AppRoute } from "@/types";

const Home = lazy(() => import("@/modules/home/home.page"));
const Cart = lazy(() => import("@/modules/cart/cart.page"));
const Product = lazy(() => import("@/modules/product/product.page"));

export const routes: AppRoute[] = [
  {
    key: "home",
    path: "/",
    component: Home,
  },
  {
    key: "product",
    path: "/products/:id",
    component: Product,
  },
  {
    key: "cart",
    path: "/cart",
    component: Cart,
  },
];
