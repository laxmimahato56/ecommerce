import { Link } from "react-router-dom";
import { useCart } from "@/context/use-cart";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ShopEase
        </Link>

        <Link to="/cart" className="relative">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
