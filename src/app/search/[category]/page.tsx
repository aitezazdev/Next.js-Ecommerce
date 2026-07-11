import CollectionSidebar from "@/components/CollectionSidebar";
import ProductCard from "@/components/products/ProductCard";
import SortingOrder from "@/components/SortingOrder";
import { dbGetProductByCategory } from "@/lib/db/products";
import React from "react";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const sp = await searchParams;
  const p = await params;
  const sort = sp.sort || "";

  const category = p.category.toLowerCase();
  const products = await dbGetProductByCategory(category);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row bg-zinc-950 min-h-[90vh] text-white px-4 md:px-8 py-8 pt-24 gap-4 md:gap-6">
      <CollectionSidebar />

      <div className="flex-1 flex flex-col md:flex-row gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 grow auto-rows-max order-2 md:order-1">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="order-1 md:order-2">
          <SortingOrder />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
