"use client";
import { useState } from "react";
import Image from "next/image";
import { useOptimisticCart } from "@/hooks/useOptimisticCart";
import { Product } from "@/types/product";
import { getCleanImageUrl } from "@/lib/utils/products";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { openCart } from "@/redux/slices/modalSlice";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

type Props = {
  product: Product;
  sizes: string[];
};

const ProductDetailsClient = ({ product, sizes }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { handleIncrease, isPending } = useOptimisticCart();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please signin first");
      return;
    }
    if (selectedSize) {
      handleIncrease(product, selectedSize);
      dispatch(openCart());
      setSelectedSize(null);
      toast.success("Added to cart");
    }
  };

  return (
    <div className="
      w-full min-h-screen bg-zinc-950
      flex flex-col md:flex-row
      p-4 pt-6
      sm:p-6 sm:pt-8
      md:p-10 md:pt-12
      lg:p-16
      gap-6 sm:gap-8 md:gap-10 lg:gap-14
    ">

      <div className="
        relative mt-20
        w-full md:w-[55%] lg:w-[60%] xl:w-2/3
        h-[50vw] max-h-[340px]
        sm:h-[45vw] sm:max-h-[420px]
        md:h-auto md:max-h-none md:min-h-[65vh]
        shrink-0
        bg-zinc-900/20 border border-zinc-800 rounded-2xl
      ">
        <Image
          src={getCleanImageUrl(product.image)}
          alt={product.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 55vw, 60vw"
          className="object-contain p-6 sm:p-10 md:p-12 lg:p-16"
        />
      </div>

      <div className="
        w-full md:w-[45%] lg:w-[40%] xl:w-1/3
        text-white
        flex flex-col justify-center
        gap-6
        pb-8 md:pb-0
        mt-6 md:mt-20
      ">
        <div className="flex flex-col gap-2">
          <h3 className="
            font-bold leading-tight tracking-tight
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          ">
            {product.title}
          </h3>

          <span className="
            rounded-full px-4 py-1.5
            bg-zinc-900 border border-zinc-800 text-zinc-100 w-fit
            text-sm sm:text-base font-semibold font-mono
          ">
            ${product.price.toFixed(2)} USD
          </span>
        </div>

        <div className="border-t border-zinc-800" />

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
          {product.description}
        </p>

        <div>
          <p className="uppercase tracking-widest text-[10px] font-semibold text-zinc-500 mb-3">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2.5">
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`
                  text-xs font-semibold
                  px-4
                  py-2.5
                  min-w-[52px]
                  rounded-xl
                  border
                  transition-all duration-200
                  hover:cursor-pointer
                  ${selectedSize === size
                    ? "bg-brand text-white border-zinc-200 shadow-lg"
                    : "bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:border-zinc-800"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`
            mt-2
            px-6
            py-3.5
            rounded-full
            text-xs font-bold uppercase tracking-widest
            transition-all duration-250
            hover:cursor-pointer
            flex items-center justify-center min-h-[48px]
            ${!selectedSize
              ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
              : "bg-brand text-white hover:bg-brand-hover shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            }
          `}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsClient;