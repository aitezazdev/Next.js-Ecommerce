import { useOptimisticCart } from "@/hooks/useOptimisticCart";
import SingleCartProduct from "./SingleCartProduct";
import ProductsCheckout from "./ProductsCheckout";
import { FiShoppingCart } from "react-icons/fi";

const CartProducts = () => {
  const { optimisticItems, handleDecrease, handleIncrease, handleRemove, totalAmount } =
    useOptimisticCart();

  if (!optimisticItems || optimisticItems.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FiShoppingCart className="text-5xl sm:text-6xl text-gray-500 mb-4" />
      <p className="text-lg sm:text-2xl font-semibold text-gray-300">
        Your cart is empty
      </p>
      <p className="text-sm sm:text-base text-gray-500 mt-1">
        Add some products to get started!
      </p>
    </div>
  );
}

  return (
    <>
      <div className="flex flex-col gap-2 mt-5 sm:mt-10 h-[50vh] overflow-y-auto pr-1">
        {optimisticItems.map((item) => (
          <SingleCartProduct
            key={`${item.product._id}-${item.size}`}
            item={item}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <ProductsCheckout totalAmount={() => totalAmount} />
    </>
  );
};

export default CartProducts;
