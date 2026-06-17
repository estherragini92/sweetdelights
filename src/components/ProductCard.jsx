import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-xl border border-[#f1e4e7] bg-white shadow-[0_8px_28px_rgba(118,72,83,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(118,72,83,0.12)]">
      <div className="relative h-[220px] overflow-hidden bg-[#f9efef]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {product.tag && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-[#ef3475] backdrop-blur">
            {product.tag}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-jakarta mb-2 text-lg font-bold text-[#3d3234]">
          {product.name}
        </h3>

        <p className="mb-5 min-h-[60px] text-[13px] leading-6 text-[#8c777b]">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
          <strong className="font-jakarta text-lg text-[#ef3475]">
            ₹{product.price}
          </strong>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 rounded-md bg-[#ef3475] px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#d92a67]"
          >
            <FiShoppingBag className="text-base" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;