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
import { BiDollar } from "react-icons/bi";
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
      w-full min-h-screen bg-black
      flex flex-col md:flex-row
      p-4 pt-6
      sm:p-6 sm:pt-8
      md:p-10 md:pt-12
      lg:p-16
      gap-6 sm:gap-8 md:gap-10 lg:gap-14
    ">

      <div className="
        relative mt-16
        w-full md:w-[55%] lg:w-[60%] xl:w-2/3
        h-[50vw] max-h-[340px]
        sm:h-[45vw] sm:max-h-[420px]
        md:h-auto md:max-h-none md:min-h-[65vh]
        shrink-0
      ">
        <Image
          src={getCleanImageUrl(product.image)}
          alt={product.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 55vw, 60vw"
          className="object-contain p-4 sm:p-6 md:p-8 lg:p-10"
        />
      </div>

      <div className="
        w-full md:w-[45%] lg:w-[40%] xl:w-1/3
        text-white
        flex flex-col justify-center
        gap-4 sm:gap-5
        pb-8 md:pb-0
      ">
        <h3 className="
          font-bold leading-tight
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl
        ">
          {product.title}
        </h3>

        <strong className="
          rounded-full px-3 py-1.5 sm:px-4 sm:py-2
          bg-blue-500 w-fit
          flex items-center gap-0.5
          text-sm sm:text-base
        ">
          <BiDollar className="shrink-0" />
          {product.price} USD
        </strong>

        <p className="border border-gray-700" />

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {product.description}
        </p>

        <div>
          <p className="uppercase tracking-widest text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`
                  text-xs sm:text-sm
                  px-3 sm:px-4 md:px-5
                  py-2
                  min-w-[48px] sm:min-w-[56px]
                  rounded-full
                  border border-transparent
                  hover:border-blue-500
                  hover:cursor-pointer
                  transition-colors duration-200
                  ${selectedSize === size ? "bg-blue-600 border-blue-600" : "bg-[#171717]"}
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || isPending}
          className={`
            mt-1 sm:mt-2
            px-4 sm:px-6
            py-3 sm:py-3.5
            rounded-full
            text-sm sm:text-base font-medium
            transition-colors duration-300
            hover:cursor-pointer
            flex items-center justify-center min-h-[44px]
            ${!selectedSize || isPending
              ? "bg-blue-400 cursor-not-allowed opacity-70"
              : "bg-blue-500 hover:bg-blue-600"
            }
          `}
        >
          {isPending ? <PulseLoader size={6} color="#fff" /> : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsClient;