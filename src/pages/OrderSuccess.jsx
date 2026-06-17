import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiClock,
  FiHome,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const [order] = useState(() => {
    return (
      location.state?.order ||
      JSON.parse(localStorage.getItem("sweetDelightsLatestOrder"))
    );
  });

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
    }
  }, [order, navigate]);

  if (!order) return null;

  const steps = [
    "Order Confirmed",
    "Preparing Your Cake",
    "Baking in Progress",
    "Ready for Dispatch",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = 1;

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section className="min-h-screen bg-[#fff8f6] px-6 py-16">
      <div className="mx-auto max-w-[1050px]">
        <div className="rounded-2xl bg-white p-8 text-center shadow-[0_12px_35px_rgba(100,60,70,0.08)] md:p-12">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-green-50 text-5xl text-green-600">
            <FiCheckCircle />
          </div>

          <h1 className="font-jakarta mt-6 text-4xl font-semibold text-[#3d3234] md:text-5xl">
            Order Successful!
          </h1>

          <p className="mx-auto mt-4 max-w-[620px] text-sm leading-7 text-[#846f73]">
            Thank you for ordering from Sweet Delights. Your order has been
            confirmed and our bakers have started preparing it.
          </p>

          <div className="mt-8 rounded-xl bg-[#fff8f6] p-5 text-left">
            <div className="grid gap-5 md:grid-cols-4">
              <InfoCard title="Order ID" value={order.id} />
              <InfoCard title="Customer" value={order.customerName} />
              <InfoCard title="Payment" value={order.paymentMethod} />
              <InfoCard title="Total" value={formatPrice(order.grandTotal)} />
            </div>
          </div>

          <div className="mt-10 text-left">
            <h2 className="font-jakarta text-2xl font-semibold text-[#3d3234]">
              Track Your Order
            </h2>

            <div className="mt-7">
              <div className="h-3 rounded-full bg-[#f0dfe4]">
                <div
                  className="h-3 rounded-full bg-[#ef3475]"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className={`rounded-xl border p-5 ${
                      index <= currentStep
                        ? "border-[#ef3475] bg-[#fff0f5]"
                        : "border-[#eadfe1] bg-white"
                    }`}
                  >
                    <div
                      className={`mb-3 grid h-10 w-10 place-items-center rounded-full text-lg ${
                        index <= currentStep
                          ? "bg-[#ef3475] text-white"
                          : "bg-[#f2e7e9] text-[#9b8589]"
                      }`}
                    >
                      {index === 0 && <FiCheckCircle />}
                      {index === 1 && <FiPackage />}
                      {index === 2 && <FiClock />}
                      {index === 3 && <FiPackage />}
                      {index === 4 && <FiTruck />}
                      {index === 5 && <FiMapPin />}
                    </div>

                    <p className="font-jakarta text-sm font-semibold text-[#3d3234]">
                      {step}
                    </p>

                    <p className="mt-2 text-xs text-[#8c777b]">
                      {index <= currentStep ? "Completed" : "Pending"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
            <div className="rounded-xl border border-[#eadfe1] p-6">
              <h2 className="font-jakarta text-xl font-semibold">
                Ordered Items
              </h2>

              <div className="mt-5 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[60px_1fr_auto] items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[60px] w-[60px] rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="text-sm font-semibold">{item.name}</h3>
                      <p className="text-xs text-[#927d82]">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <strong className="text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#eadfe1] p-6">
              <h2 className="font-jakarta text-xl font-semibold">
                Delivery Address
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#806e72]">
                {order.deliveryAddress?.address}, <br />
                {order.deliveryAddress?.city}, {order.deliveryAddress?.state} -{" "}
                {order.deliveryAddress?.pincode}
              </p>

              <p className="mt-5 text-sm text-[#806e72]">
                Phone: <strong>{order.phone}</strong>
              </p>

              <p className="mt-2 text-sm text-[#806e72]">
                Status:{" "}
                <strong className="text-[#ef3475]">{order.orderStatus}</strong>
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-[#ef3475] px-7 py-3 text-sm font-bold text-[#ef3475] transition hover:bg-[#fff0f5]"
            >
              <FiHome />
              Back to Home
            </Link>

            <Link
              to="/cakes"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ef3475] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#d92a67]"
            >
              <FiShoppingBag />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, value }) {
  return (
    <div>
      <p className="text-xs text-[#927d82]">{title}</p>
      <p className="mt-1 break-all text-sm font-bold text-[#3d3234]">
        {value}
      </p>
    </div>
  );
}

export default OrderSuccess;