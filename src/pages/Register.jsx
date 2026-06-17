import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const result = register({
      name,
      email,
      phone,
      password,
    });

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    navigate("/");
  };

  return (
    <section className="min-h-[calc(100vh-74px)] bg-[#fff8f6]">
      <div className="mx-auto grid min-h-[calc(100vh-74px)] w-full lg:grid-cols-2">
        {/* Left Side */}
        <div className="flex items-center justify-center px-6 py-14 sm:px-10">
          <div className="w-full max-w-[470px]">
            <Link
              to="/"
              className="font-jakarta inline-flex items-center gap-2 text-xl font-bold text-[#ef3475]"
            >
              <FiShoppingBag />
              <span>Sweet Delights</span>
            </Link>

            <div className="mt-10">
              <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#ef3475]">
                Create Account
              </span>

              <h2 className="font-jakarta mt-3 text-4xl font-semibold text-[#3d3234]">
                Join Sweet Delights
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#846f73]">
                Create an account and enjoy your favourite cakes and pastries.
              </p>
            </div>

            {message && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}
              <InputField
                label="Full Name"
                icon={<FiUser />}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />

              {/* Email */}
              <InputField
                label="Email Address"
                icon={<FiMail />}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              {/* Phone */}
              <InputField
                label="Phone Number"
                icon={<FiPhone />}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />

              {/* Password */}
              <PasswordField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              {/* Confirm Password */}
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-[#ef3475] py-3.5 text-sm font-bold text-white transition hover:bg-[#d92a67]"
              >
                Create Account
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[#846f73]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#ef3475]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative hidden overflow-hidden bg-[#f7ecee] lg:block">
          <img
            src="/images/reg.png"
            alt="Register"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#3d3234]/70 via-[#3d3234]/10 to-transparent" />

          <div className="absolute bottom-14 left-14 right-14 text-white">
            <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-semibold backdrop-blur">
              Premium Bakery Experience
            </span>

            <h1 className="font-jakarta mt-5 max-w-[560px] text-5xl font-semibold leading-tight">
              Start Your Sweet Journey With Us
            </h1>

            <p className="mt-4 max-w-[520px] text-sm leading-7 text-white/85">
              Create an account to manage orders, save favourites and enjoy a
              seamless checkout experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#4d3d41]">
        {label}
      </label>

      <div className="flex h-12 items-center gap-3 rounded-lg border border-[#e6d7db] bg-white px-4 focus-within:border-[#ef3475]">
        <span className="text-lg text-[#a28c91]">{icon}</span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#4d3d41]">
        {label}
      </label>

      <div className="flex h-12 items-center gap-3 rounded-lg border border-[#e6d7db] bg-white px-4 focus-within:border-[#ef3475]">
        <FiLock className="text-lg text-[#a28c91]" />

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter password"
          className="h-full w-full bg-transparent text-sm outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-lg text-[#8e787d]"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );
}

export default Register;