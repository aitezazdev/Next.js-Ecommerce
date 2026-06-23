import ProductsCarousel from "@/components/products/ProductsCarousel";
import ProductTitlePriceCard from "@/components/products/ProductTitlePriceCard";
import { dbGetRandomProducts } from "@/lib/db/products";
import Image from "next/image";
import Link from "next/link";
import { BiDollar } from "react-icons/bi";

export const metadata = {
  title: "Zaz Store",
};

export default async function HomePage() {
  const randomProducts = await dbGetRandomProducts();
  const slug = "printed-summer-shirt";

  return (
    <main className="min-h-[90vh] bg-[#171717]">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-5 px-3 sm:px-4 md:px-5 pt-6 sm:pt-10 md:pt-16 lg:pt-20 mb-4 md:mb-5">

        <Link
          href={`/products/${slug}`}
          className="
            bg-[#000000] rounded-md relative
            border border-transparent hover:border-blue-500
            hover:cursor-pointer group
            w-full md:w-4/6 mt-14 sm:mt-0
            h-[38vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh]
          "
        >
          <Image
            src="/products/shirts/shirt4.png"
            alt="Summer Shirt"
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
            className="object-contain p-6 sm:p-10 md:p-14 lg:p-16 group-hover:scale-105 transition-all duration-400"
          />

          <div className="
            absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-10 md:left-8 lg:bottom-12 lg:left-10
            flex items-center
            border border-gray-700 rounded-full
            bg-black/60 backdrop-blur-sm
          ">
            <h3 className="text-gray-300 text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 font-semibold truncate max-w-[120px] sm:max-w-[180px] md:max-w-[220px]">
              Printed Summer Shirt
            </h3>
            <strong className="flex items-center bg-green-900 text-[10px] sm:text-xs md:text-sm text-white px-2 sm:px-3 m-0.5 py-1 sm:py-1.5 rounded-3xl shrink-0">
              <BiDollar /><span>19</span>
            </strong>
          </div>
        </Link>

        <div className="
          w-full md:w-2/6
          grid grid-cols-2 gap-2
          md:grid-cols-1 md:flex md:flex-col md:gap-0 md:space-y-4
        ">
          {randomProducts.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product._id}
              className="
                block relative rounded-md
                border border-transparent hover:border-blue-500
                hover:cursor-pointer group
                bg-[#000000]
                h-[22vh] sm:h-[26vh] md:h-[calc(50%-8px)] lg:h-[33.5vh]
              "
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
                className="object-contain p-2 sm:p-3 group-hover:scale-105 transition-all duration-400"
              />
              <ProductTitlePriceCard product={product} />
            </Link>
          ))}
        </div>
      </div>

      <ProductsCarousel />
    </main>
  );
}