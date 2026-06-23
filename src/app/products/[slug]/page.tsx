import { dbGetProductDetails } from "@/lib/db/products";
import { getSizesByCategory } from "@/lib/utils/products";
import ProductDetailsClient from "@/components/products/ProductDetailsClient";

type Props = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: Props) => {
  const product = await dbGetProductDetails(params.slug);
  const sizes = getSizesByCategory(product.category);

  return <ProductDetailsClient product={product} sizes={sizes} />;
};

export default Page;
