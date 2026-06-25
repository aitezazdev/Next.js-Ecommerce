"use client";
import { CartItem } from "@/types/cartItem";
import Image from "next/image";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { getCleanImageUrl } from "@/lib/utils/products";
import React from "react";
import { BiDollar } from "react-icons/bi";

interface Props {
  item: CartItem;
  onDecrease: (productId: string, size: string) => void;
  onIncrease: (productId: string, size: string) => void;
}

const SingleCartProduct = ({ item, onDecrease, onIncrease }: Props) => {
  const { product, quantity, size } = item;

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 py-4 border-b border-gray-700">
      <Image
        width={56}
        height={56}
        src={getCleanImageUrl(product.image)}
        alt={product.title}
        className="rounded-md w-16 h-16 p-1 border border-gray-700 object-cover"
      />

      <div className="flex-1 text-white min-w-[120px]">
        <p className="font-medium text-sm sm:text-base">{product.title}</p>
        <p className="text-xs text-gray-400">Size: {size}</p>
      </div>

      <div className="flex w-full flex-row justify-center md:flex-col items-center gap-2">
        <p className="text-sm font-bold text-gray-400 flex items-center">
          <BiDollar />
          {(product.price * quantity).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 border border-gray-700 rounded-full">
          <button
            className="text-white hover:text-red-400 transition"
            onClick={() => onDecrease(product._id, size)}
          >
            <HiMinusSm className="text-lg" />
          </button>
          <span className="text-sm text-white font-semibold min-w-[16px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => onIncrease(product._id, size)}
            className="text-white hover:text-green-400 transition"
          >
            <HiOutlinePlusSm className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SingleCartProduct);
