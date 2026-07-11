"use client";
import { CartItem } from "@/types/cartItem";
import Image from "next/image";
import { HiMinusSm, HiOutlinePlusSm, HiOutlineTrash } from "react-icons/hi";
import { getCleanImageUrl } from "@/lib/utils/products";
import React from "react";

interface Props {
  item: CartItem;
  onDecrease: (productId: string, size: string) => void;
  onIncrease: (productId: string, size: string) => void;
  onRemove: (productId: string, size: string) => void;
}

const SingleCartProduct = ({ item, onDecrease, onIncrease, onRemove }: Props) => {
  const { product, quantity, size } = item;

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 py-4 border-b border-zinc-900/60">
      <Image
        width={56}
        height={56}
        src={getCleanImageUrl(product.image)}
        alt={product.title}
        className="rounded-xl w-14 h-14 p-1 border border-zinc-900 object-contain bg-zinc-950/40"
      />

      <div className="flex-1 text-white min-w-[120px]">
        <p className="font-medium text-xs sm:text-sm text-zinc-100">{product.title}</p>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Size: {size}</p>
      </div>

      <div className="flex w-full flex-row justify-between sm:justify-center md:flex-col items-center gap-2">
        <p className="text-xs font-semibold text-zinc-300 flex items-center font-mono">
          ${(product.price * quantity).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 px-2.5 py-1 border border-zinc-800 rounded-full bg-zinc-900/20">
          <button
            className="text-zinc-400 hover:text-white transition flex items-center justify-center cursor-pointer"
            onClick={() => onDecrease(product._id, size)}
            title={quantity === 1 ? "Remove item" : "Decrease quantity"}
          >
            {quantity === 1 ? (
              <HiOutlineTrash className="text-sm" />
            ) : (
              <HiMinusSm className="text-sm" />
            )}
          </button>
          <span className="text-xs text-white font-medium min-w-[14px] text-center select-none font-mono">
            {quantity}
          </span>
          <button
            onClick={() => onIncrease(product._id, size)}
            className="text-zinc-400 hover:text-white transition flex items-center justify-center cursor-pointer"
            title="Increase quantity"
          >
            <HiOutlinePlusSm className="text-sm" />
          </button>
        </div>
        {quantity > 1 && (
          <button
            onClick={() => onRemove(product._id, size)}
            className="text-[10px] text-zinc-500 hover:text-zinc-300 transition underline cursor-pointer uppercase tracking-wider"
            title="Remove item from cart"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SingleCartProduct);
