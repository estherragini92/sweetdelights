import { Link } from "react-router-dom";
import {
  FiClock,
  FiMapPin,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi";
import { FaBicycle } from "react-icons/fa";

import products from "../data/products.json";
import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart } = useCart();

  const cakes = products
    .filter((product) => product.category === "cake")
    .slice(0, 4);

  const pastries = products
    .filter((product) => product.category === "pastry")
    .slice(0, 4);

  const behindScenes = [
    {
      title: "Baking with Care",
      image: "/images/img1.jpg",
    },
    {
      title: "Artistic Decoration",
      image: "/images/img2.jpg",
    },
    {
      title: "Safe Packaging",
      image: "/images/img3.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Verified Buyer",
      image: "/images/cus1.jpg",
      review:
        "The best chocolate truffle I have ever had! The delivery was perfectly on time and the packaging kept the cake completely intact. Highly recommend!",
    },
    {
      name: "Michael Roberts",
      role: "Event Booking",
      image: "/images/cus2.jpg",
      review:
        "We ordered a custom themed cake for my daughter's birthday. It looked absolutely stunning and tasted heavenly. Thank you for making her day special.",
    },
    {
      name: "Emily Chen",
      role: "Verified Buyer",
      image: "/images/cus3.jpg",
      review:
        "Their macarons are to die for! So fresh and the perfect texture. The hygiene and quality standards they maintain are truly impressive.",
    },
  ];

  return (
    <div className="bg-[#fff8f6] text-[#3d3234]">
      {/* Hero */}
      <section className="bg-[#fff8f6]">
        <div className="mx-auto grid min-h-[690px] w-[min(100%-48px,1370px)] items-center gap-16 py-20 lg:grid-cols-[0.9fr_1.15fr] max-md:min-h-0 max-md:grid-cols-1 max-md:gap-10 max-md:py-14 max-sm:w-[min(100%-24px,1370px)]">
          <div className="max-w-[560px]">
            <span className="inline-flex rounded-full bg-[#fff1dc] px-4 py-2 text-[12px] font-semibold text-[#755f3c]">
              🍰 Premium Bakery
            </span>

            <h1 className="mt-7 font-jakarta text-[clamp(48px,5vw,78px)] font-medium leading-[1.05] tracking-[-2px] text-[#3e3335]">
              Freshly Baked Happiness Delivered to Your Door
            </h1>

            <p className="mt-7 max-w-[520px] text-[17px] leading-[1.65] text-[#8c777b]">
              Experience the finest cakes and pastries crafted with love,
              premium ingredients, and a touch of magic. Perfect for every
              celebration.
            </p>

            <Link
              to="/cakes"
              className="mt-8 inline-flex rounded-md bg-[#ef3475] px-9 py-4 text-[16px] font-semibold text-white transition hover:bg-[#d92a67]"
            >
              Order Now
            </Link>
          </div>

          <div className="overflow-hidden">
            <img
               
              src="/images/chocotruffle.jpg"
              alt="Premium celebration cake"
              className="hero-animation h-[560px] w-full object-cover max-md:h-[430px] max-sm:h-[320px]"
            />
            </div>
        </div>
      </section>

      {/* Signature cakes */}
      <section className="bg-[#f7ecee] py-20">
        <div className="mx-auto w-[min(100%-48px,1260px)] max-sm:w-[min(100%-24px,1260px)]">
          <h2 className="font-jakarta text-center text-[42px] font-medium text-[#3f3436] max-sm:text-[30px]">
            Our Signature Flavours
          </h2>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {cakes.map((product) => (
              <article data-aos="zoom-in"
                key={product.id}
                className="overflow-hidden rounded-[8px] bg-white"
                
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[270px] w-full object-cover"
                />

                <div className="p-7">
                  <h3 className="font-jakarta text-[23px] font-medium text-[#ef3475]">
                    {product.name}
                  </h3>

                  <p className="mt-3 min-h-[58px] text-[14px] leading-6 text-[#8b767a]">
                    {product.description}
                  </p>

                  <p className="mt-5 text-[19px] font-semibold text-[#ef3475]">
                    ₹{product.price}
                  </p>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-7 w-full rounded-[6px] bg-[#ef3475] py-3.5 text-[17px] font-medium text-white transition hover:bg-[#d92a67]"
                  >
                    ADD TO CART
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pastries */}
      <section className="bg-[#f7ecee] pb-20">
        <div className="mx-auto w-[min(100%-48px,1260px)] max-sm:w-[min(100%-24px,1260px)]">
          <h2 className="font-jakarta text-center text-[42px] font-medium text-[#3f3436] max-sm:text-[30px]">
            Delightful Pastries
          </h2>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {pastries.map((product) => (
                    <article 
                      key={product.id}
                      className="group overflow-hidden rounded-xl bg-white shadow-lg
                      transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl"
                      data-aos="flip-left"
                    >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[310px] w-full object-cover"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the scenes */}
      <section className="bg-[#fff0df] py-24">
        <div className="mx-auto w-[min(100%-48px,1180px)] text-center max-sm:w-[min(100%-24px,1180px)]">
          <h2 className="font-jakarta text-[43px] font-medium text-[#3e3335] max-sm:text-[30px]">
            Behind the Scenes
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-7 text-[#705d61]">
            Made in a clean and hygienic kitchen with premium ingredients. Our
            bakers pour their passion into every single creation.
          </p>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {behindScenes.map((item) => (
              <div key={item.title}>
                <div className="mx-auto h-[215px] w-[215px] overflow-hidden rounded-full border-[5px]
                border-white shadow-xl transition-all duration-700 hover:-translate-y-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-6 text-[18px] font-medium text-[#3e3335]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="bg-[#fff8f6] py-20">
        <div className="mx-auto w-[min(100%-48px,1120px)] max-sm:w-[min(100%-24px,1120px)]">
          <div className="grid min-h-[380px] items-center rounded-[8px] bg-[#efb2cf] px-16 py-12 md:grid-cols-[1fr_260px] max-md:gap-10 max-sm:px-7">
            <div>
              <h2 className="font-jakarta text-[40px] font-medium max-sm:text-[30px]">
                Freshness Delivered Quickly
              </h2>

              <div className="mt-8 space-y-5 text-[18px]">
                <div className="flex items-center gap-4">
                  <FiClock className="text-[25px]" />
                  <span>Fast delivery within 60 minutes</span>
                </div>

                <div className="flex items-center gap-4">
                  <FiPackage className="text-[25px]" />
                  <span>Safe and secure packaging</span>
                </div>

                <div className="flex items-center gap-4">
                  <FiMapPin className="text-[25px]" />
                  <span>Live order tracking</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <FaBicycle className="text-[110px] text-[#3d3234]" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#fff8f6] py-20">
        <div className="mx-auto w-[min(100%-48px,1120px)] max-sm:w-[min(100%-24px,1120px)]">
          <h2 className="font-jakarta text-center text-[43px] font-medium text-[#3e3335] max-sm:text-[30px]">
            What Our Customers Say
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="min-h-[315px] rounded-[8px] border border-[#eadfe1] bg-white p-8"
              >
                <div className="text-[22px] tracking-[1px] text-[#f6b700]">
                  ☆☆☆☆☆
                </div>

                <p className="mt-7 text-[15px] leading-[1.65] text-[#896f74]">
                  “{testimonial.review}”
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-[52px] w-[52px] rounded-full object-cover"
                  />

                  <div>
                    <h3 className="text-[16px] font-semibold text-[#3d3234]">
                      {testimonial.name}
                    </h3>

                    <p className="text-[13px] text-[#9b8589]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default Home;