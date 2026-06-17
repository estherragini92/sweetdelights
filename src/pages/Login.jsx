import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShoppingBag,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setMessageType("error");
      setMessage("Please enter your email and password.");
      return;
    }

    const result = login(formData);

    if (!result.success) {
      setMessageType("error");
      setMessage(result.message);
      return;
    }

    setMessageType("success");
    setMessage(result.message);

    navigate(redirectPath, { replace: true });
  };

  return (
    <section className="min-h-[calc(100vh-74px)] bg-[#fff8f6]">
      <div className="mx-auto grid min-h-[calc(100vh-74px)] w-full lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#f7ecee] lg:block">
          <img
            src="/images/login1.png"
            alt="Sweet Delights celebration cake"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#3d3234]/70 via-[#3d3234]/10 to-transparent" />

          <div className="absolute bottom-14 left-14 right-14 text-white">
            <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-semibold backdrop-blur">
              Premium Bakery Experience
            </span>

            <h1 className="font-jakarta mt-5 max-w-[560px] text-5xl font-semibold leading-tight">
              Welcome back to Sweet Delights
            </h1>

            <p className="mt-4 max-w-[520px] text-sm leading-7 text-white/85">
              Sign in to manage your cart, continue checkout, and view your
              previous orders.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-14 sm:px-10">
          <div className="w-full max-w-[470px]">
            <Link
              to="/register"
              className="font-jakarta inline-flex items-center gap-2 text-xl font-bold text-[#ef3475]"
            >
              <FiShoppingBag />
              <span>Sweet Delights</span>
            </Link>

            <div className="mt-10">
              <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#ef3475]">
                Customer Login
              </span>

              <h2 className="font-jakarta mt-3 text-4xl font-semibold text-[#3d3234]">
                Welcome Back
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#846f73]">
                Enter your account details to continue shopping.
              </p>
            </div>

            {message && (
              <div
                className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                  messageType === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#4d3d41]"
                >
                  Email address
                </label>

                <div className="flex h-12 items-center gap-3 rounded-lg border border-[#e6d7db] bg-white px-4 focus-within:border-[#ef3475] focus-within:ring-2 focus-within:ring-[#ef3475]/10">
                  <FiMail className="shrink-0 text-lg text-[#a28c91]" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="h-full w-full border-none bg-transparent text-sm text-[#3d3234] outline-none placeholder:text-[#b09ba0]"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#4d3d41]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#ef3475] hover:text-[#d92a67]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="flex h-12 items-center gap-3 rounded-lg border border-[#e6d7db] bg-white px-4 focus-within:border-[#ef3475] focus-within:ring-2 focus-within:ring-[#ef3475]/10">
                  <FiLock className="shrink-0 text-lg text-[#a28c91]" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-full w-full border-none bg-transparent text-sm text-[#3d3234] outline-none placeholder:text-[#b09ba0]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="text-lg text-[#8e787d] hover:text-[#ef3475]"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#ef3475] py-3.5 text-sm font-bold text-white transition hover:bg-[#d92a67]"
              >
                Login
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#eadde0]" />
              <span className="text-xs text-[#a18b90]">New to Sweet Delights?</span>
              <div className="h-px flex-1 bg-[#eadde0]" />
            </div>

            <Link
              to="/register"
              className="flex w-full items-center justify-center rounded-lg border border-[#ef3475] py-3.5 text-sm font-bold text-[#ef3475] transition hover:bg-[#fff0f5]"
            >
              Create New Account
            </Link>

            <p className="mt-8 text-center text-xs leading-5 text-[#a18b90]">
              By continuing, you agree to our terms of service and privacy
              policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;