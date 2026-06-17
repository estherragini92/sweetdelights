import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShoppingBag,
  FiTwitter,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="border-t border-[#f0e3e6] bg-[#fffaf9]">
      <div className="mx-auto grid w-[min(100%-40px,1180px)] gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 max-sm:w-[min(100%-24px,1180px)]">
        <div>
          <Link
            to="/"
            className="font-jakarta inline-flex items-center gap-2 text-[20px] font-bold text-[#ef3475]"
          >
            <FiShoppingBag className="text-[22px]" />
            <span>Sweet Delights</span>
          </Link>

          <p className="mt-5 max-w-[280px] text-sm leading-7 text-[#8a7378]">
            Freshly baked cakes and pastries made with premium ingredients,
            care, and love for every celebration.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#eadde0] bg-white text-lg text-[#6f5b60] transition hover:border-[#ef3475] hover:bg-[#fff0f5] hover:text-[#ef3475]"
            >
              <FiInstagram />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#eadde0] bg-white text-lg text-[#6f5b60] transition hover:border-[#ef3475] hover:bg-[#fff0f5] hover:text-[#ef3475]"
            >
              <FiFacebook />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#eadde0] bg-white text-lg text-[#6f5b60] transition hover:border-[#ef3475] hover:bg-[#fff0f5] hover:text-[#ef3475]"
            >
              <FiTwitter />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-jakarta text-lg font-semibold text-[#3d3234]">
            Quick Links
          </h3>

          <nav className="mt-5 flex flex-col gap-3 text-sm text-[#826d72]">
            <Link to="/" className="transition hover:text-[#ef3475]">
              Home
            </Link>

            <Link to="/cakes" className="transition hover:text-[#ef3475]">
              Cakes
            </Link>

            <Link to="/pastries" className="transition hover:text-[#ef3475]">
              Pastries
            </Link>

            <Link to="/about" className="transition hover:text-[#ef3475]">
              About Us
            </Link>

            <Link to="/cart" className="transition hover:text-[#ef3475]">
              Cart
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-jakarta text-lg font-semibold text-[#3d3234]">
            Customer Support
          </h3>

          <nav className="mt-5 flex flex-col gap-3 text-sm text-[#826d72]">
            <Link to="/login" className="transition hover:text-[#ef3475]">
              Login
            </Link>

            <Link to="/register" className="transition hover:text-[#ef3475]">
              Register
            </Link>

            <a href="#" className="transition hover:text-[#ef3475]">
              Delivery Information
            </a>

            <a href="#" className="transition hover:text-[#ef3475]">
              Privacy Policy
            </a>

            <a href="#" className="transition hover:text-[#ef3475]">
              Terms & Conditions
            </a>
          </nav>
        </div>

        <div>
          <h3 className="font-jakarta text-lg font-semibold text-[#3d3234]">
            Contact Us
          </h3>

          <div className="mt-5 space-y-4 text-sm text-[#826d72]">
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-1 shrink-0 text-lg text-[#ef3475]" />

              <p className="leading-6">
                24 Bakery Street,
                <br />
                Salem, Tamil Nadu
              </p>
            </div>

            <a
              href="tel:+919876543210"
              className="flex items-center gap-3 transition hover:text-[#ef3475]"
            >
              <FiPhone className="shrink-0 text-lg text-[#ef3475]" />
              <span>+91 98765 43210</span>
            </a>

            <a
              href="mailto:hello@sweetdelights.com"
              className="flex items-center gap-3 transition hover:text-[#ef3475]"
            >
              <FiMail className="shrink-0 text-lg text-[#ef3475]" />
              <span className="break-all">hello@sweetdelights.com</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f0e3e6]">
        <div className="mx-auto flex w-[min(100%-40px,1180px)] items-center justify-between gap-4 py-5 text-xs text-[#9b868b] max-sm:w-[min(100%-24px,1180px)] max-sm:flex-col max-sm:text-center">
          <p>© 2026 Sweet Delights Bakery. All rights reserved.</p>

          <p>Baked with love in Salem</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;