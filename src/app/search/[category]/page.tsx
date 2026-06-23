import CollectionSidebar from "@/components/CollectionSidebar";
import ProductCard from "@/components/products/ProductCard";
import SortingOrder from "@/components/SortingOrder";
import { dbGetProductByCategory } from "@/lib/db/products";
import React from "react";

type Props = {
  params: { category: string };
  searchParams: Promise<{ sort?: string }>;
};

const CategoryPage = async ({ params, searchParams }: Props) => {
   const sp = await searchParams;
  const sort = sp.sort || "";

  const category = params.category.toLowerCase();
  const products = await dbGetProductByCategory(category);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex bg-[#171717] min-h-[90vh] pt-20 text-white py-5">
      <CollectionSidebar />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 grow">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <SortingOrder />
    </div>
  );
};

export default CategoryPage;
