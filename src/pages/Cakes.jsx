import { useMemo, useState } from "react";
import { FiSearch, FiShoppingBag } from "react-icons/fi";

import products from "../data/products.json";
import { useCart } from "../context/CartContext";

function Cakes() {
  const { addToCart } = useCart();

  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const cakeProducts = useMemo(() => {
    let result = products.filter(
      (product) =>
        product.category === "cake" &&
        product.id >= 9 &&
        product.id <= 16 &&
        product.name
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
    );

    if (sortOption === "low-to-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOption === "high-to-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sortOption === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [searchText, sortOption]);

  return (
    <div className="bg-[#fff8f6] text-[#3d3234]">
      {/* Banner */}
      <section
        className="relative flex min-h-[520px] items-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,50,52,0.35), rgba(61,50,52,0.35)), url('/images/cakeban.png')",
        }}
      >
        <div className="mx-auto w-[min(100%-48px,1240px)] max-sm:w-[min(100%-24px,1240px)]">
          <div className="max-w-[620px] text-white">
            <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
              Premium Celebration Cakes
            </span>

            <h1 className="font-jakarta mt-6 text-[clamp(48px,6vw,78px)] font-medium leading-[1.05] tracking-[-2px]">
              Cakes Made for Every Beautiful Moment
            </h1>

            <p className="mt-6 max-w-[540px] text-[16px] leading-7 text-white/90">
              Discover handcrafted cakes made with premium ingredients,
              beautiful decoration, and fresh flavours for every celebration.
            </p>

            <a
              href="#cake-products"
              className="mt-8 inline-flex rounded-md bg-[#ef3475] px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#d92a67] hover:shadow-lg"
            >
              Explore Cakes
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="cake-products" className="bg-[#f7ecee] py-20 md:py-24">
        <div className="mx-auto w-[min(100%-48px,1240px)] max-sm:w-[min(100%-24px,1240px)]">
          <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#ef3475]">
                Sweet Delights
              </span>

              <h2 className="font-jakarta mt-3 text-[clamp(34px,4vw,48px)] font-medium">
                Our Signature Cake Collection
              </h2>
            </div>

            <p className="text-sm text-[#8a7478]">
              {cakeProducts.length}{" "}
              {cakeProducts.length === 1 ? "cake" : "cakes"} available
            </p>
          </div>

          <div className="mt-9 flex items-center justify-between gap-5 max-md:flex-col max-md:items-stretch">
            <div className="flex h-12 w-full max-w-[430px] items-center gap-3 rounded-md border border-[#eadfe1] bg-white px-4 max-md:max-w-none">
              <FiSearch className="text-lg text-[#a08b90]" />

              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search cakes..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#b09ba0]"
              />
            </div>

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="h-12 min-w-[200px] rounded-md border border-[#eadfe1] bg-white px-4 text-sm outline-none max-md:w-full"
            >
              <option value="default">Sort by</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {cakeProducts.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cakeProducts.map((product) => (
                <article
                  key={product.id}
                  className="group flex h-full w-full max-w-[290px] flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_8px_26px_rgba(110,72,82,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(110,72,82,0.16)]"
                >
                  <div className="relative h-[270px] w-full overflow-hidden bg-[#f7ecee]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-jakarta text-[20px] font-medium text-[#3d3234] transition-colors duration-300 group-hover:text-[#ef3475]">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-[12px] text-[#9a8589]">
                      {product.weight || "1 kg"} •{" "}
                      {product.eggless ? "Eggless" : "Contains Egg"}
                    </p>

                    <p className="mt-3 min-h-[66px] text-[13px] leading-6 text-[#836f73]">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                      <strong className="font-jakarta text-[18px] text-[#ef3475]">
                        ₹{product.price}
                      </strong>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="inline-flex items-center gap-2 rounded-md bg-[#ef3475] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#d92a67] hover:shadow-md active:scale-95"
                      >
                        <FiShoppingBag />
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-xl border border-dashed border-[#e4cfd5] bg-white px-6 py-20 text-center">
              <h3 className="font-jakarta text-xl font-semibold">
                No cakes found
              </h3>

              <p className="mt-2 text-sm text-[#8a7478]">
                Try searching with another cake name.
              </p>
            </div>
          )}
        </div>
      </section>

{/* Event Orders Section */}
<section className="bg-[#f7eded] py-20 md:py-24">
  <div className="mx-auto grid w-[min(100%-48px,1180px)] items-center gap-12 lg:grid-cols-2 max-sm:w-[min(100%-24px,1180px)]">
    <div className="grid grid-cols-2 gap-4">
      <div className="overflow-hidden rounded-[18px]">
        <img
          src="/images/birth1.jpg"
          alt="Birthday celebration cake"
          className="h-[360px] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="mt-12 overflow-hidden rounded-[18px]">
        <img
          src="/images/birth2.jpg"
          alt="Custom event cake"
          className="h-[360px] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>

    <div>
      <span className="inline-flex rounded-full bg-[#fff4df] px-4 py-2 text-xs font-semibold text-[#8a6729]">
        Special Events
      </span>

      <h2 className="font-jakarta mt-5 text-[clamp(34px,5vw,56px)] font-medium leading-tight text-[#3d3234]">
        We Accept Birthday Party & Event Orders
      </h2>

      <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-[#806e72]">
        Make every celebration special with a customised cake designed for your
        occasion. Choose your favourite flavour, colour, theme, message, and
        decoration style.
      </p>

      <div className="mt-7 space-y-4 text-sm text-[#665357]">
        <div className="flex items-center gap-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ffe4ee] text-xs font-bold text-[#ef3475]">
            ✓
          </span>
          <span>Customized birthday cakes</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ffe4ee] text-xs font-bold text-[#ef3475]">
            ✓
          </span>
          <span>Unique themed designs</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ffe4ee] text-xs font-bold text-[#ef3475]">
            ✓
          </span>
          <span>Bulk party orders and dessert tables</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ffe4ee] text-xs font-bold text-[#ef3475]">
            ✓
          </span>
          <span>Eggless cake options available</span>
        </div>
      </div>

      <a
        href="#cake-products"
        className="mt-8 inline-flex rounded-md bg-[#ef3475] px-8 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#d92a67] hover:shadow-lg"
      >
        Book Now
      </a>
    </div>
  </div>
</section>

    </div>
  );
}

export default Cakes;