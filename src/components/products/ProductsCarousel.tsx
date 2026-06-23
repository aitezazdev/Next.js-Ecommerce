import { dbGetAllProducts } from "@/lib/db/products";
import Image from "next/image";
import React from "react";
import ProductTitlePriceCard from "./ProductTitlePriceCard";
import Link from "next/link";

const ProductsCarousel = async () => {
  const products = await dbGetAllProducts();

  return (
    <section className="w-full">
      <div className="
        w-full
        overflow-x-auto
        scroll-smooth
        snap-x snap-mandatory
        [-webkit-overflow-scrolling:touch]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      ">
        <div className="
          bg-[#171717]
          flex flex-nowrap
          gap-2 sm:gap-3 md:gap-4 lg:gap-5
          px-3 sm:px-4 md:px-5
          pb-4 md:pb-5
          scroll-animate
        ">
          {products.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product._id}
              className="
                snap-start shrink-0
                bg-[#000000] rounded-md relative
                border border-transparent hover:border-blue-500
                hover:cursor-pointer group
                /* width ladder: phone → phablet → tablet → desktop */
                w-[200px]
                sm:w-[260px]
                md:w-[340px]
                lg:w-[420px]
                xl:w-[450px]
                /* height ladder */
                h-[18vh]
                sm:h-[22vh]
                md:h-[26vh]
                lg:h-[30vh]
              "
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, (max-width: 1024px) 340px, 450px"
                className="object-contain p-2 sm:p-3 group-hover:scale-105 transition-all duration-400"
              />
              <ProductTitlePriceCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsCarousel;