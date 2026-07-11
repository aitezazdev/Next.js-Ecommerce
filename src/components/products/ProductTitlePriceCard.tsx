import { Product } from "@/types/product";
import React from "react";

type Props = {
  product: Product;
  source?: string;
};

const ProductTitlePriceCard = ({ product, source }: Props) => {
  if (source) {
    return (
      <div className="
        my-2.5 mx-auto
        border border-zinc-800
        flex items-center justify-between
        w-fit max-w-[220px] sm:max-w-[260px]
        rounded-full
        bg-zinc-950/40 backdrop-blur-sm
        p-0.5
      ">
        <h3 className="
          text-zinc-300 font-medium truncate
          text-[10px] sm:text-xs md:text-sm
          px-3
          max-w-[130px] sm:max-w-[160px]
        ">
          {product.title}
        </h3>
        <span className="
          flex items-center shrink-0
          bg-zinc-900 text-zinc-100 border border-zinc-800
          text-[10px] sm:text-xs md:text-sm
          px-3 py-1 sm:py-1.5
          rounded-full font-medium font-mono
        ">
          ${product.price.toFixed(2)}
        </span>
      </div>
    );
  }

  return (
    <div className="
      absolute
      bottom-2 right-2
      max-w-[calc(100%-16px)] sm:max-w-[200px] md:max-w-[220px]
      border border-zinc-800
      flex items-center justify-between
      rounded-full
      bg-zinc-950/80 backdrop-blur-md
      p-0.5
      shadow-lg
    ">
      <h3 className="
        text-zinc-300 font-medium truncate
        text-[9px] sm:text-[10px] md:text-xs lg:text-sm
        px-2.5
      ">
        {product.title}
      </h3>
      <span className="
        flex items-center shrink-0
        bg-zinc-900 text-zinc-100 border border-zinc-800
        text-[9px] sm:text-[10px] md:text-xs lg:text-sm
        px-2.5 py-1 md:py-1.5
        rounded-full font-medium font-mono
      ">
        ${product.price.toFixed(2)}
      </span>
    </div>
  );
};

export default ProductTitlePriceCard;