import { Product } from "@/types/product";
import Image from "next/image";
import React from "react";
import ProductTitlePriceCard from "./ProductTitlePriceCard";
import Link from "next/link";
import { getCleanImageUrl } from "@/lib/utils/products";
import AddToCartBtn from "./AddToCartBtn";

type Props = {
  product: Product;
};

const ProductCard = async ({ product }: Props) => {

  return (
    <Link
      href={`/products/${product.slug}`}
      className="relative bg-[#000000] text-white rounded-md shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 h-[260px] md:h-[350px] group hover:cursor-pointer border border-transparent hover:border-blue-500">
      <div className="relative w-full h-52 sm:h-64 md:h-72">
        <Image
          src={getCleanImageUrl(product.image)}
          alt={product.title}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="md:p-10 p-5 object-cover group-hover:scale-105 transition-all duration-400"
        />
      </div>

      <ProductTitlePriceCard product={product} source="productCard" />

      <AddToCartBtn product={product} category={product.category} />
    </Link>
  );
};

export default ProductCard;
