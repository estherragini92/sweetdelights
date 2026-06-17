import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 50 : 0;
  const taxes = subtotal * 0.05;
  const grandTotal = subtotal + deliveryFee + taxes;

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#fff8f6] px-6 py-20 text-center">
        <FiShoppingBag className="mx-auto text-7xl text-[#ef3475]" />

        <h1 className="font-jakarta mt-6 text-4xl font-semibold">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-[#846f73]">
          Add your favourite cakes and pastries to continue.
        </p>

        <Link
          to="/cakes"
          className="mt-8 inline-flex rounded-lg bg-[#ef3475] px-8 py-3 text-sm font-bold text-white"
        >
          Start Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fff8f6] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-jakarta text-4xl font-semibold text-[#3d3234]">
          Shopping Cart
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_330px]">
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid gap-5 rounded-xl bg-white p-5 shadow-sm sm:grid-cols-[150px_1fr_auto]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[150px] w-full rounded-lg object-cover"
                />

                <div>
                  <h2 className="font-jakarta text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-sm text-[#846f73]">
                    {item.weight || "1 kg"} •{" "}
                    {item.eggless ? "Eggless" : "Contains Egg"}
                  </p>

                  <p className="mt-4 font-bold text-[#ef3475]">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between gap-5 max-sm:items-start">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 transition hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>

                  <div className="flex items-center rounded-md border border-[#eadfe1]">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="grid h-9 w-9 place-items-center"
                    >
                      <FiMinus />
                    </button>

                    <span className="grid h-9 w-9 place-items-center border-x border-[#eadfe1]">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="grid h-9 w-9 place-items-center"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-bold text-red-500 transition hover:text-red-700"
            >
              Clear Cart
            </button>
          </div>

          <aside className="sticky top-[95px] h-fit rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-jakarta text-2xl font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryRow
                label="Delivery Fee"
                value={formatPrice(deliveryFee)}
              />
              <SummaryRow label="Taxes" value={formatPrice(taxes)} />

              <div className="border-t border-[#eadfe1] pt-4">
                <SummaryRow
                  label="Total"
                  value={formatPrice(grandTotal)}
                  bold
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-7 w-full rounded-lg bg-[#ef3475] py-3.5 text-sm font-bold text-white transition hover:bg-[#d92a67]"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <div
      className={`flex items-center justify-between ${
        bold ? "text-lg font-bold text-[#ef3475]" : "text-[#806e72]"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default Cart;