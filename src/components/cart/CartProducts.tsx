import { useOptimisticCart } from "@/hooks/useOptimisticCart";
import SingleCartProduct from "./SingleCartProduct";
import ProductsCheckout from "./ProductsCheckout";
import { FiShoppingCart } from "react-icons/fi";

const CartProducts = () => {
  const { optimisticItems, handleDecrease, handleIncrease, handleRemove, totalAmount } =
    useOptimisticCart();

  const validItems = (optimisticItems || []).filter(
    (item) => item && item.product && typeof item.product !== "string"
  );

  if (validItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center my-auto">
        <FiShoppingCart className="text-5xl sm:text-6xl text-zinc-650 mb-4" />
        <p className="text-md font-semibold text-zinc-300">
          Your cart is empty
        </p>
        <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider">
          Add products to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin">
        {validItems.map((item) => (
          <SingleCartProduct
            key={`${item.product?._id || (item.product as any)}-${item.size}`}
            item={item}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <ProductsCheckout totalAmount={() => totalAmount} />
    </div>
  );
};

export default CartProducts;
