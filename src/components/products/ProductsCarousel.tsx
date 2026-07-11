import { dbGetAllProducts } from "@/lib/db/products";
import Image from "next/image";
import React from "react";
import ProductTitlePriceCard from "./ProductTitlePriceCard";
import Link from "next/link";
import { getCleanImageUrl } from "@/lib/utils/products";

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
          bg-zinc-950
          flex flex-nowrap
          gap-4
          px-4 md:px-8
          pb-8
          scroll-animate
        ">
          {products.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product._id}
              className="
                snap-start shrink-0
                bg-zinc-900/40 rounded-xl relative
                border border-zinc-800 hover:border-zinc-700
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
                transition-all duration-300
              "
            >
              <Image
                src={getCleanImageUrl(product.image)}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 200px, (max-width: 768px) 260px, (max-width: 1024px) 340px, 450px"
                className="object-contain p-4 group-hover:scale-[1.02] transition-all duration-500"
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