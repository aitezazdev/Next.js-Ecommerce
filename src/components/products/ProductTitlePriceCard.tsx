import { Product } from "@/types/product";
import React from "react";
import { BiDollar } from "react-icons/bi";

type Props = {
  product: Product;
  source?: string;
};

const ProductTitlePriceCard = ({ product, source }: Props) => {
  if (source) {
    return (
      <div className="
        my-2 mx-auto
        border border-gray-700
        flex items-center justify-between
        w-fit max-w-[220px] sm:max-w-[260px]
        rounded-full
        overflow-hidden
      ">
        <h3 className="
          text-gray-300 font-semibold truncate
          text-[10px] sm:text-xs md:text-sm
          px-2 sm:px-3
          max-w-[130px] sm:max-w-[160px]
        ">
          {product.title}
        </h3>
        <strong className="
          flex items-center shrink-0
          bg-green-900 text-white
          text-[10px] sm:text-xs md:text-sm
          px-2 sm:px-3
          m-0.5 py-1 sm:py-1.5
          rounded-3xl
        ">
          <BiDollar className="shrink-0" />
          {product.price.toFixed(2)}
        </strong>
      </div>
    );
  }

  return (
    <div className="
      absolute
      /* Position: hug the bottom-right corner on all sizes */
      bottom-1.5 right-1.5
      sm:bottom-2 sm:right-2
      md:bottom-2 md:right-2
      /* Width cap so it never overflows the card */
      max-w-[calc(100%-12px)] sm:max-w-[200px] md:max-w-[220px]
      border border-gray-700
      flex items-center justify-between
      rounded-full
      overflow-hidden
      /* Subtle glass effect so it stays legible over any image */
      bg-black/50 backdrop-blur-sm
    ">
      <h3 className="
        text-gray-300 font-semibold truncate
        text-[9px] sm:text-[10px] md:text-xs lg:text-sm
        px-1.5 sm:px-2 md:px-2
      ">
        {product.title}
      </h3>
      <strong className="
        flex items-center shrink-0
        bg-green-900 text-white
        text-[9px] sm:text-[10px] md:text-xs lg:text-sm
        px-1.5 sm:px-2 md:px-3
        m-0.5 py-1 sm:py-1 md:py-1.5
        rounded-3xl
      ">
        <BiDollar className="shrink-0" />
        {product.price.toFixed(2)}
      </strong>
    </div>
  );
};

export default ProductTitlePriceCard;