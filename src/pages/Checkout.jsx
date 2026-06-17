import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiMapPin, FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = 50;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + deliveryCharge + tax;

  const handlePlaceOrder = () => {
    if (
      !formData.customerName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all delivery details.");
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      ...formData,
      items: cartItems,
      grandTotal,
      date: new Date().toLocaleString(),
      orderStatus: "Order Confirmed",

      deliveryAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
    };

    localStorage.setItem(
      "sweetDelightsLatestOrder",
      JSON.stringify(order)
    );

    const previousOrders =
      JSON.parse(localStorage.getItem("sweetDelightsOrders")) || [];

    localStorage.setItem(
      "sweetDelightsOrders",
      JSON.stringify([...previousOrders, order])
    );

    clearCart();

    navigate("/order-success", {
      state: {
        order,
      },
    });
  };

  return (
    <section className="min-h-screen bg-[#fff8f6] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-jakarta text-4xl font-semibold text-[#3d3234]">
          Checkout
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-8">

            {/* Customer Details */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="flex items-center gap-2 font-jakarta text-2xl font-semibold">
                <FiUser />
                Customer Details
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="rounded-lg border p-3 outline-none"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="rounded-lg border p-3 outline-none"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="flex items-center gap-2 font-jakarta text-2xl font-semibold">
                <FiMapPin />
                Delivery Address
              </h2>

              <div className="mt-6 space-y-5">
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full rounded-lg border p-3 outline-none"
                />

                <div className="grid gap-5 md:grid-cols-3">
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="rounded-lg border p-3 outline-none"
                  />

                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="rounded-lg border p-3 outline-none"
                  />

                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="rounded-lg border p-3 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className="flex items-center gap-2 font-jakarta text-2xl font-semibold">
                <FiCreditCard />
                Payment Method
              </h2>

              <div className="mt-6 space-y-4">
                <label className="flex gap-3 rounded-xl border p-4">
                  <input
                    type="radio"
                    checked={formData.paymentMethod === "Cash on Delivery"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        paymentMethod: "Cash on Delivery",
                      })
                    }
                  />
                  Cash on Delivery
                </label>

                <label className="flex gap-3 rounded-xl border p-4">
                  <input
                    type="radio"
                    checked={formData.paymentMethod === "UPI"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        paymentMethod: "UPI",
                      })
                    }
                  />
                  UPI
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="sticky top-24 h-fit rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-jakarta text-2xl font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₹50</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4 text-lg font-bold text-[#ef3475]">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full rounded-xl bg-[#ef3475] py-4 font-bold text-white transition hover:bg-[#d92a67]"
            >
              Place Order
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Checkout;