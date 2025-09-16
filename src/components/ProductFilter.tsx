import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductFilterProps = {
  categories: string[];
  category: string;
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
  sort: string;
  setSort: (sort: string) => void;
};

const ProductFilter = ({
  categories,
  category,
  setCategory,
  setPage,
  sort,
  setSort,
}: ProductFilterProps) => {
  return (
    <div className="flex gap-4">
      {/* Category Filter */}
      <Select
        value={category}
        onValueChange={(val) => {
          setCategory(val);
          setPage(1);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="priceLowHigh">Price: Low → High</SelectItem>
          <SelectItem value="priceHighLow">Price: High → Low</SelectItem>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="name">Name</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductFilter;
