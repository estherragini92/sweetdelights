import { useMemo, useState } from "react";
import { FiSearch, FiShoppingBag } from "react-icons/fi";

import products from "../data/products.json";
import { useCart } from "../context/CartContext";

function Pastries() {
  const { addToCart } = useCart();

  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [activeTag, setActiveTag] = useState("All");

  const tags = [
    "All",
    "Flaky",
    "Choux",
    "Seasonal",
    "Phyllo",
    "Puff",
    "Yeasted",
    "Sweet Slices",
  ];

  const pastryProducts = useMemo(() => {
  let result = products.filter(
    (product) =>
      product.category === "pastry" &&
      product.id >= 17 &&
      product.name
        .toLowerCase()
        .includes(searchText.trim().toLowerCase()) &&
      (activeTag === "All" || product.tag === activeTag)
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
}, [searchText, sortOption, activeTag]);

  return (
    <div className="bg-[#fff8f6] text-[#3d3234]">
      <section
        className="relative min-h-[520px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(50,35,38,0.32), rgba(50,35,38,0.32)), url('/images/pastryban.png')",
        }}
      >
        <div className="mx-auto flex min-h-[520px] w-[min(100%-48px,1240px)] items-center max-sm:w-[min(100%-24px,1240px)]">
          <div className="max-w-[620px] text-white">
            <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-semibold backdrop-blur-sm">
              Freshly Baked Every Day
            </span>

            <h1 className="font-jakarta mt-6 text-[clamp(48px,6vw,78px)] font-medium leading-[1.05] tracking-[-2px]">
              Delicate Pastries, Beautifully Handcrafted
            </h1>

            <p className="mt-6 max-w-[540px] text-[16px] leading-7 text-white/90">
              Discover buttery croissants, creamy éclairs, fruit tarts,
              Danish pastries, and sweet slices made fresh throughout the day.
            </p>

            <a
              href="#pastry-products"
              className="mt-8 inline-flex rounded-md bg-[#ef3475] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d92a67]"
            >
              Explore Pastries
            </a>
          </div>
        </div>
      </section>

      <section id="pastry-products" className="bg-[#f7ecee] py-20 md:py-24">
        <div className="mx-auto w-[min(100%-48px,1240px)] max-sm:w-[min(100%-24px,1240px)]">
          <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#ef3475]">
                Freshly Handmade
              </span>

              <h2 className="font-jakarta mt-3 text-[clamp(34px,4vw,48px)] font-medium">
                Our Pastry Collection
              </h2>
            </div>

            <p className="text-sm text-[#8a7478]">
              {pastryProducts.length}{" "}
              {pastryProducts.length === 1 ? "pastry" : "pastries"} available
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  activeTag === tag
                    ? "bg-[#ef3475] text-white"
                    : "border border-[#e8d9dd] bg-white text-[#725f63] hover:border-[#ef3475] hover:text-[#ef3475]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-5 max-md:flex-col max-md:items-stretch">
            <div className="flex h-12 w-full max-w-[430px] items-center gap-3 rounded-md border border-[#eadfe1] bg-white px-4 max-md:max-w-none">
              <FiSearch className="text-lg text-[#a08b90]" />

              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search pastries..."
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

          {pastryProducts.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pastryProducts.map((product) => (
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

                      {product.tag && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#ef3475] backdrop-blur transition-transform duration-300 group-hover:scale-105">
                          {product.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-jakarta text-[20px] font-medium text-[#3d3234] transition-colors duration-300 group-hover:text-[#ef3475]">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-[12px] text-[#9a8589]">
                        {product.weight || "1 piece"} •{" "}
                        {product.eggless ? "Eggless" : "Contains Egg"}
                      </p>

                      <p className="mt-3 min-h-[66px] text-[13px] leading-6 text-[#836f73]">
                        {product.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                        <strong className="font-jakarta text-[18px] text-[#ef3475] transition-transform duration-300 group-hover:scale-105">
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
                No pastries found
              </h3>

              <p className="mt-2 text-sm text-[#8a7478]">
                Try another category or search term.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#fff0df] py-20">
        <div className="mx-auto grid w-[min(100%-48px,1160px)] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] max-sm:w-[min(100%-24px,1160px)]">
          <div>
            <span className="inline-flex rounded-full bg-[#fff7e4] px-4 py-2 text-xs font-semibold text-[#8a6729]">
              Baked in Small Batches
            </span>

            <h2 className="font-jakarta mt-5 text-[clamp(34px,5vw,56px)] font-medium leading-tight">
              Fresh Texture, Rich Flavour, Beautiful Finish
            </h2>

            <p className="mt-6 text-[15px] leading-7 text-[#806e72]">
              Every pastry is prepared in small batches using quality butter,
              fresh cream, chocolate, fruit, and carefully selected fillings.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-5">
                <h3 className="font-jakarta text-lg font-semibold">
                  Premium Butter
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#806e72]">
                  Rich flavour and perfectly flaky layers.
                </p>
              </div>

              <div className="rounded-lg bg-white p-5">
                <h3 className="font-jakarta text-lg font-semibold">
                  Fresh Fillings
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#806e72]">
                  Cream, chocolate, fruit, and seasonal flavours.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/birth1.jpg"
              alt="Freshly baked pastry"
              className="h-[390px] w-full object-cover"
            />

            <img
              src="/images/birth2.jpg"
              alt="Pastry assortment"
              className="mt-14 h-[390px] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pastries;