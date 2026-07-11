import ProductsCarousel from "@/components/products/ProductsCarousel";
import ProductTitlePriceCard from "@/components/products/ProductTitlePriceCard";
import { dbGetRandomProducts } from "@/lib/db/products";
import Image from "next/image";
import Link from "next/link";
import { getCleanImageUrl } from "@/lib/utils/products";


export const metadata = {
  title: "Zaz Store",
};

export default async function HomePage() {
  const randomProducts = await dbGetRandomProducts();
  const slug = "printed-summer-shirt";

  return (
    <main className="min-h-[90vh] bg-zinc-950">
      <div className="flex flex-col md:flex-row gap-4 px-4 md:px-8 pt-24 pb-8 mb-4 md:mb-5">

        <Link
          href={`/products/${slug}`}
          className="
            bg-zinc-900/40 rounded-xl relative
            border border-zinc-800 hover:border-zinc-700
            hover:cursor-pointer group
            w-full md:w-4/6 mt-14 sm:mt-0
            h-[38vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh]
            transition-all duration-300
          "
        >
          <Image
            src="/products/shirts/shirt4.webp"
            alt="Printed Summer Shirt"
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
            className="object-contain p-6 sm:p-10 md:p-14 lg:p-16 group-hover:scale-[1.02] transition-all duration-500"
          />

          <div className="
            absolute bottom-4 left-4
            flex items-center
            border border-zinc-800/80 rounded-full
            bg-zinc-950/80 backdrop-blur-md p-1
          ">
            <h3 className="text-zinc-200 text-[10px] sm:text-xs md:text-sm px-3 font-medium truncate max-w-[120px] sm:max-w-[180px] md:max-w-[220px]">
              Printed Summer Shirt
            </h3>
            <span className="flex items-center bg-zinc-900 border border-zinc-800 text-[10px] sm:text-xs md:text-sm text-zinc-100 px-3 py-1 sm:py-1.5 rounded-full shrink-0 font-medium font-mono">
              $19.00
            </span>
          </div>
        </Link>

        <div className="
          w-full md:w-2/6
          grid grid-cols-2 gap-4
          md:grid-cols-1 md:flex md:flex-col md:gap-0 md:space-y-4
        ">
          {randomProducts.map((product) => (
            <Link
              href={`/products/${product.slug}`}
              key={product._id}
              className="
                block relative rounded-xl
                border border-zinc-800 hover:border-zinc-700
                hover:cursor-pointer group
                bg-zinc-900/40
                h-[22vh] sm:h-[26vh] md:h-[calc(50%-8px)] lg:h-[33.5vh]
                transition-all duration-300
              "
            >
              <Image
                src={getCleanImageUrl(product.image)}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                priority
                className="object-contain p-4 sm:p-6 group-hover:scale-[1.02] transition-all duration-500"
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