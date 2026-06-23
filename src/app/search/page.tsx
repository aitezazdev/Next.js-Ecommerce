import CollectionSidebar from "@/components/CollectionSidebar";
import ProductCard from "@/components/products/ProductCard";
import SortingOrder from "@/components/SortingOrder";
import { dbGetAllProducts, dbSearchProducts } from "@/lib/db/products";
import React from "react";

export const metadata = {
  title: "Zaz Store - Search",
};

type Props = {
  searchParams: Promise<{ query?: string; sort?: string }>;
};

const AllProductsPage = async ({ searchParams }: Props) => {
  const sp = await searchParams;
  const query = sp.query || "";
  const sort = sp.sort || "";

  const products = query ? await dbSearchProducts(query) : await dbGetAllProducts();

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  const productNotFound = () => {
    if (query && products.length === 0) {
      return (
        <div className="min-h-[80vh] bg-[#171717] text-white p-5 font-semibold">
          <p>No products found for "{query}".</p>
        </div>
      );
    }
  };

  return (
    <div className="flex bg-[#171717] min-h-[90vh] text-white py-5 pt-20">
      <CollectionSidebar />

      {productNotFound() || (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 grow">
            {sortedProducts.map((product, _index) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>

          <SortingOrder />
        </>
      )}
    </div>
  );
};

export default AllProductsPage;
