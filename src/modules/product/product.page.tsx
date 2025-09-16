import Loader from "@/shared/loader";
import type { Product } from "@/types";
import { useCart } from "@/context/use-cart";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { isPending, error, data } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
        res.json()
      ),
    enabled: !!id, // only run when id is available
  });

  const handleAddToCart = () => {
    if (!data) return;
    addToCart(data);
  };

  if (isPending) return <Loader />;

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading product
      </div>
    );

  return (
    <div>
      <div className="max-w-2xl mx-auto border rounded-lg p-6 shadow">
        {data && (
          <>
            <img
              src={data.image}
              alt={data.title}
              className="h-64 object-contain mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-600 mb-4">{data.description}</p>
            <p className="text-lg font-semibold">${data.price}</p>
            <p className="text-sm text-gray-500 mt-2">
              Category: {data.category}
            </p>
          </>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            🛒 Add to Cart
          </button>

          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
