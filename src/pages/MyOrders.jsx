import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiRefreshCw,
  FiStar,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

function MyOrders() {
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("sweetDelightsOrders")) || [];

    setOrders(savedOrders.reverse());
  }, []);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const saveOrders = (updatedOrders) => {
    setOrders(updatedOrders);

    localStorage.setItem(
      "sweetDelightsOrders",
      JSON.stringify([...updatedOrders].reverse())
    );
  };

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, orderStatus: "Cancelled" }
        : order
    );

    saveOrders(updatedOrders);
  };

  const markDelivered = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, orderStatus: "Delivered" }
        : order
    );

    saveOrders(updatedOrders);
  };

  const reorder = (items) => {
    items.forEach((item) => addToCart(item));
    alert("Items added to cart.");
  };

  if (orders.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#fff8f6] px-6">
        <div className="text-center">
          <FiPackage className="mx-auto text-6xl text-[#ef3475]" />

          <h1 className="font-jakarta mt-5 text-4xl font-semibold">
            No Orders Yet
          </h1>

          <p className="mt-3 text-[#846f73]">
            Start shopping to see your orders here.
          </p>

          <Link
            to="/cakes"
            className="mt-8 inline-flex rounded-lg bg-[#ef3475] px-8 py-3 font-bold text-white"
          >
            Shop Cakes
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fff8f6] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#ef3475]">
          Order History
        </span>

        <h1 className="font-jakarta mt-3 text-4xl font-semibold text-[#3d3234]">
          My Orders
        </h1>

        <div className="mt-10 space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(100,60,70,0.07)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs text-[#927d82]">Order ID</p>

                  <h2 className="font-jakarta mt-1 text-xl font-semibold">
                    {order.id}
                  </h2>

                  <p className="mt-2 text-sm text-[#846f73]">
                    {order.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-[#846f73]">Total Amount</p>

                  <h3 className="font-jakarta mt-1 text-2xl font-bold text-[#ef3475]">
                    {formatPrice(order.grandTotal)}
                  </h3>

                  <span
                    className={`mt-3 inline-flex rounded-full px-4 py-1.5 text-xs font-bold ${
                      order.orderStatus === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-[#fff0f5] text-[#ef3475]"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl bg-[#fff8f6] p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="text-sm font-semibold text-[#3d3234]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#927d82]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/track-order"
                  state={{ order }}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#ef3475] px-5 py-2.5 text-sm font-bold text-[#ef3475] transition hover:bg-[#fff0f5]"
                >
                  <FiTruck />
                  Track Order
                </Link>

                <button
                  type="button"
                  onClick={() => reorder(order.items || [])}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#ef3475] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#d92a67]"
                >
                  <FiRefreshCw />
                  Reorder
                </button>

                {order.orderStatus !== "Cancelled" &&
                  order.orderStatus !== "Delivered" && (
                    <>
                      <button
                        type="button"
                        onClick={() => cancelOrder(order.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                      >
                        <FiXCircle />
                        Cancel Order
                      </button>

                      <button
                        type="button"
                        onClick={() => markDelivered(order.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-green-200 px-5 py-2.5 text-sm font-bold text-green-700 transition hover:bg-green-50"
                      >
                        Mark Delivered
                      </button>
                    </>
                  )}
              </div>

              {order.orderStatus === "Delivered" && !order.review && (
                <ReviewForm
                  order={order}
                  orders={orders}
                  saveOrders={saveOrders}
                />
              )}

              {order.review && (
                <div className="mt-7 rounded-xl bg-[#fff8f6] p-5">
                  <h3 className="font-jakarta text-lg font-semibold">
                    Your Review
                  </h3>

                  <div className="mt-3 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={
                          star <= order.review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-[#806e72]">
                    {order.review.comment}
                  </p>

                  <p className="mt-3 text-xs text-[#927d82]">
                    {order.review.date}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewForm({ order, orders, saveOrders }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = () => {
    if (!comment.trim()) {
      alert("Please write your review.");
      return;
    }

    const updatedOrders = orders.map((item) =>
      item.id === order.id
        ? {
            ...item,
            review: {
              rating,
              comment,
              date: new Date().toLocaleDateString(),
            },
          }
        : item
    );

    saveOrders(updatedOrders);
    alert("Thank you for your review!");
  };

  return (
    <div className="mt-7 rounded-xl bg-[#fff8f6] p-5">
      <h3 className="font-jakarta text-lg font-semibold">
        Give Your Review
      </h3>

      <div className="mt-4 flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-3xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        rows="4"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Write your review..."
        className="mt-5 w-full rounded-lg border border-[#eadfe1] p-4 outline-none focus:border-[#ef3475]"
      />

      <button
        type="button"
        onClick={submitReview}
        className="mt-4 rounded-lg bg-[#ef3475] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d92a67]"
      >
        Submit Review
      </button>
    </div>
  );
}

export default MyOrders;