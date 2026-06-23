import { dbGetProductDetails } from "@/lib/db/products";
import { getSizesByCategory } from "@/lib/utils/products";
import ProductDetailsClient from "@/components/products/ProductDetailsClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await dbGetProductDetails(slug);
  const sizes = getSizesByCategory(product.category);

  return <ProductDetailsClient product={product} sizes={sizes} />;
};

export default Page;
