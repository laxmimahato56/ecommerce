import type { Product } from "@/types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      key={product.id}
      to={`/products/${product.id}`}
      className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-32 object-contain mx-auto mb-3"
      />
      <h2 className="text-sm font-medium line-clamp-2 mb-1">{product.title}</h2>
      <p className="text-gray-600 text-sm">${product.price}</p>
      <p className="text-xs text-gray-500">{product.category}</p>
      <p className="text-xs text-yellow-500">
        ⭐ {product.rating.rate} ({product.rating.count})
      </p>
    </Link>
  );
};

export default ProductCard;
