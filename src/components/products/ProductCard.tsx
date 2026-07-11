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
      className="relative bg-zinc-900/40 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 h-[260px] md:h-[350px] group hover:cursor-pointer border border-zinc-800/80 hover:border-zinc-700/80">
      <div className="relative w-full h-44 sm:h-56 md:h-64">
        <Image
          src={getCleanImageUrl(product.image)}
          alt={product.title}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="p-4 md:p-8 object-contain group-hover:scale-[1.03] transition-all duration-500"
        />
      </div>

      <ProductTitlePriceCard product={product} source="productCard" />

      <AddToCartBtn product={product} category={product.category} />
    </Link>
  );
};

export default ProductCard;
