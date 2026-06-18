import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingBag,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  const getLinkClasses = ({ isActive }) =>
    `relative py-3 text-sm font-bold transition-colors duration-200
    after:absolute after:bottom-0 after:left-1/2 after:h-0.5
    after:-translate-x-1/2 after:rounded-full after:bg-[#ef3475]
    after:transition-all after:duration-200
    ${
      isActive
        ? "text-[#ef3475] after:w-full"
        : "text-[#231f20] after:w-0 hover:text-[#ef3475] hover:after:w-full"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f8ecef] bg-white">
      <div className="mx-auto flex min-h-[74px] w-[min(100%-40px,1240px)] items-center justify-between gap-7">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="font-jakarta flex shrink-0 items-center gap-2 text-xl font-bold tracking-[-0.4px] text-[#ef3475]"
        >
          <FiShoppingBag className="text-xl" />
          <span>Sweet Delights</span>
        </NavLink>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="grid h-10 w-10 place-items-center rounded-lg border border-[#f0dfe4] bg-white text-[22px] text-[#3d3234] lg:hidden"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          className={`
            absolute left-0 top-[74px] w-full overflow-hidden bg-white
            transition-all duration-300 lg:static lg:flex lg:max-h-none
            lg:flex-1 lg:items-center lg:justify-end lg:gap-10 lg:overflow-visible
            ${
              menuOpen
                ? "max-h-[550px] border-b border-[#f1e2e6] opacity-100"
                : "max-h-0 border-b border-transparent opacity-0 lg:opacity-100"
            }
          `}
        >
          <nav className="flex flex-col px-5 py-3 lg:flex-row lg:items-center lg:gap-8 lg:p-0">
            <NavLink to="/" end onClick={closeMenu} className={getLinkClasses}>
              Home
            </NavLink>

            <NavLink to="/cakes" onClick={closeMenu} className={getLinkClasses}>
              Cake
            </NavLink>

            <NavLink
              to="/pastries"
              onClick={closeMenu}
              className={getLinkClasses}
            >
              Pastries
            </NavLink>

            <NavLink to="/about" onClick={closeMenu} className={getLinkClasses}>
              About
            </NavLink>

            <NavLink
              to="/my-orders"
              onClick={closeMenu}
              className={getLinkClasses}
            >
              My Orders
            </NavLink>

          </nav>

          <div className="flex flex-col items-start gap-5 border-t border-[#f7ebee] px-6 py-5 lg:flex-row lg:items-center lg:border-0 lg:p-0">
            {isAuthenticated ? (
              <div className="flex w-full items-center justify-between gap-3 lg:w-auto">
                <div className="flex items-center gap-2">
                  <span className="font-jakarta grid h-9 w-9 place-items-center rounded-full bg-[#ffe5ef] text-sm font-extrabold text-[#ef3475]">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>

                  <div className="flex flex-col leading-tight">
                    <span className="text-[9px] text-[#9b888c]">
                      Welcome
                    </span>

                    <strong className="max-w-[120px] truncate text-xs text-[#3d3234]">
                      {user?.name}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#f0dfe4] bg-white text-base text-[#3d3234] transition hover:border-[#ef3475] hover:bg-[#fff2f7] hover:text-[#ef3475]"
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 text-sm font-bold text-[#3d3234] transition hover:text-[#ef3475]"
              >
                <FiUser className="text-xl" />
                <span>Login</span>
              </NavLink>
            )}

            <NavLink
              to="/cart"
              onClick={closeMenu}
              className="flex w-full items-center justify-between gap-2 text-xs font-extrabold text-[#211d1e] lg:w-auto"
            >
              <span className="relative inline-flex text-2xl">
                <FiShoppingBag />

                {cartCount > 0 && (
                  <span className="absolute -right-3 -top-3 grid h-5 min-w-5 place-items-center rounded-full border-2 border-white bg-[#ef3475] px-1 text-[9px] leading-none text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </span>

              <span>CART</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;