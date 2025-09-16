import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loader from "@/shared/loader";
import type { Product } from "@/types";
import { ITEMS_PER_PAGE } from "@/constants";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/use-debounce";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";

export default function Home() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const { isPending, error, data } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  const filtered = useMemo(() => {
    let filteredData = data || [];
    if (category !== "all") {
      filteredData = filteredData.filter((p) => p.category === category);
    }
    // Search filter
    if (debouncedSearch.trim() !== "") {
      filteredData = filteredData.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return filteredData;
  }, [data, category, debouncedSearch]);

  const sorted = useMemo(() => {
    const sortedData = [...filtered];
    switch (sort) {
      case "priceLowHigh":
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sortedData.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedData.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return sortedData;
  }, [filtered, sort]);

  const categories = [...new Set(data?.map((p) => p.category))];

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isPending) return <Loader />;

  if (error)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading products
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="md:w-1/3"
        />
        <ProductFilter
          categories={categories}
          category={category}
          setCategory={setCategory}
          setPage={setPage}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* Products */}
      {currentItems.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
