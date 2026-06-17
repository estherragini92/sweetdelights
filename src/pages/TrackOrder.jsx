import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiClock,
  FiHome,
  FiMapPin,
  FiPackage,
  FiTruck,
} from "react-icons/fi";

function TrackOrder() {
  const location = useLocation();
  const navigate = useNavigate();

  const order =
    location.state?.order ||
    JSON.parse(localStorage.getItem("sweetDelightsLatestOrder"));

  if (!order) {
    navigate("/my-orders", { replace: true });
    return null;
  }

  const steps = [
    {
      title: "Order Confirmed",
      description: "Your order has been received.",
      icon: <FiCheckCircle />,
    },
    {
      title: "Preparing Your Cake",
      description: "Our bakers are preparing your order.",
      icon: <FiPackage />,
    },
    {
      title: "Baking in Progress",
      description: "Fresh baking is currently in progress.",
      icon: <FiClock />,
    },
    {
      title: "Ready for Dispatch",
      description: "Your order is packed and ready.",
      icon: <FiPackage />,
    },
    {
      title: "Out for Delivery",
      description: "Your order is on the way.",
      icon: <FiTruck />,
    },
    {
      title: "Delivered",
      description: "Your order has been delivered.",
      icon: <FiMapPin />,
    },
  ];

  const currentStep =
    order.orderStatus === "Cancelled"
      ? -1
      : order.orderStatus === "Delivered"
      ? 5
      : 1;

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section className="min-h-screen bg-[#fff8f6] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#ef3475]">
            Order Tracking
          </span>

          <h1 className="font-jakarta mt-3 text-4xl font-semibold text-[#3d3234] md:text-5xl">
            Track Your Order
          </h1>

          <p className="mt-3 text-sm text-[#846f73]">
            Order ID: <strong>{order.id}</strong>
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_12px_35px_rgba(100,60,70,0.08)] md:p-10">
          {order.orderStatus === "Cancelled" ? (
            <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
              <h2 className="font-jakarta text-2xl font-semibold">
                Order Cancelled
              </h2>
              <p className="mt-2 text-sm">
                This order has been cancelled and will not be processed.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <div className="h-3 rounded-full bg-[#f0dfe4]">
                  <div
                    className="h-3 rounded-full bg-[#ef3475] transition-all"
                    style={{
                      width: `${((currentStep + 1) / steps.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`grid gap-5 rounded-xl border p-5 sm:grid-cols-[55px_1fr_auto] sm:items-center ${
                      index <= currentStep
                        ? "border-[#ef3475] bg-[#fff0f5]"
                        : "border-[#eadfe1] bg-white"
                    }`}
                  >
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-full text-xl ${
                        index <= currentStep
                          ? "bg-[#ef3475] text-white"
                          : "bg-[#f2e7e9] text-[#9b8589]"
                      }`}
                    >
                      {step.icon}
                    </div>

                    <div>
                      <h2 className="font-jakarta text-lg font-semibold text-[#3d3234]">
                        {step.title}
                      </h2>

                      <p className="mt-1 text-sm text-[#846f73]">
                        {step.description}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                        index <= currentStep
                          ? "bg-[#ef3475] text-white"
                          : "bg-[#f5eeee] text-[#927d82]"
                      }`}
                    >
                      {index <= currentStep ? "Done" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#eadfe1] p-6">
              <h2 className="font-jakarta text-xl font-semibold">
                Order Details
              </h2>

              <div className="mt-5 space-y-3 text-sm text-[#806e72]">
                <p>
                  Customer: <strong>{order.customerName}</strong>
                </p>

                <p>
                  Phone: <strong>{order.phone}</strong>
                </p>

                <p>
                  Payment: <strong>{order.paymentMethod}</strong>
                </p>

                <p>
                  Total:{" "}
                  <strong className="text-[#ef3475]">
                    {formatPrice(order.grandTotal)}
                  </strong>
                </p>

                <p>
                  Status: <strong>{order.orderStatus}</strong>
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#eadfe1] p-6">
              <h2 className="font-jakarta text-xl font-semibold">
                Delivery Address
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#806e72]">
                {order.deliveryAddress?.address}, <br />
                {order.deliveryAddress?.city},{" "}
                {order.deliveryAddress?.state} -{" "}
                {order.deliveryAddress?.pincode}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/my-orders"
              className="rounded-lg border border-[#ef3475] px-7 py-3 text-sm font-bold text-[#ef3475] transition hover:bg-[#fff0f5]"
            >
              Back to My Orders
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ef3475] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#d92a67]"
            >
              <FiHome />
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrackOrder;