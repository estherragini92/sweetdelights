import { Link } from "react-router-dom";
import {
  FiAward,
  FiHeart,
  FiPackage,
  FiShield,
  FiUsers,
} from "react-icons/fi";

function About() {
  const values = [
    {
      icon: <FiHeart />,
      title: "Made with Love",
      description:
        "Every cake and pastry is carefully prepared with passion and attention to detail.",
    },
    {
      icon: <FiAward />,
      title: "Premium Ingredients",
      description:
        "We choose quality chocolate, fresh cream, fruits, butter, and natural flavours.",
    },
    {
      icon: <FiShield />,
      title: "Clean and Hygienic",
      description:
        "Our kitchen follows strict hygiene and food-safety practices every day.",
    },
    {
      icon: <FiPackage />,
      title: "Safe Packaging",
      description:
        "Orders are securely packed to preserve freshness, shape, and presentation.",
    },
  ];

  const stats = [
    { value: "5K+", label: "Happy Customers" },
    { value: "50+", label: "Cake Flavours" },
    { value: "8+", label: "Years of Baking" },
    { value: "4.9", label: "Customer Rating" },
  ];

  return (
    <div className="bg-[#fff8f6] text-[#3d3234]">
      <section className="bg-[#f8eeee] py-20 md:py-28">
        <div className="mx-auto grid w-[min(100%-40px,1180px)] items-center gap-14 lg:grid-cols-2 max-sm:w-[min(100%-24px,1180px)]">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-[#fff1dc] px-4 py-2 text-xs font-semibold text-[#755f3c]">
              Our Story
            </span>

            <h1 className="font-jakarta text-[clamp(42px,6vw,72px)] font-medium leading-[1.08] tracking-[-2px] text-[#3d3234]">
              Baking Sweet Memories for Every Celebration
            </h1>

            <p className="mt-7 max-w-[560px] text-[16px] leading-8 text-[#826f73]">
              Sweet Delights began with one simple idea: every celebration
              deserves something beautiful, fresh, and delicious. From birthday
              cakes to handcrafted pastries, every creation is prepared with
              care and made to bring happiness.
            </p>

            <p className="mt-5 max-w-[560px] text-[16px] leading-8 text-[#826f73]">
              Our bakers combine traditional methods with creative decoration
              to deliver desserts that taste wonderful and look unforgettable.
            </p>

            <Link
              to="/cakes"
              className="mt-8 inline-flex rounded-md bg-[#ef3475] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d92a67]"
            >
              Explore Our Cakes
            </Link>
          </div>

          
            <img
              src="/images/about2.png"
              alt="Decorated celebration cake"
              className="h-[440px] w-full rounded-tl-[60px] object-cover max-sm:h-[300px]"
            />

            
        </div>
      </section>

      <section className="bg-[#fff8f6] py-20">
        <div className="mx-auto w-[min(100%-40px,1120px)] max-sm:w-[min(100%-24px,1120px)]">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#ef3475]">
              Why Choose Us
            </span>

            <h2 className="font-jakarta mt-3 text-[clamp(32px,4vw,48px)] font-medium">
              What Makes Sweet Delights Special
            </h2>
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-xl border border-[#f0e1e4] bg-white p-7 text-center shadow-[0_8px_24px_rgba(103,66,74,0.05)]"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#ffe5ef] text-2xl text-[#ef3475]">
                  {value.icon}
                </div>

                <h3 className="font-jakarta mt-5 text-lg font-semibold">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#846f73]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff0df] py-20">
        <div className="mx-auto grid w-[min(100%-40px,1120px)] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] max-sm:w-[min(100%-24px,1120px)]">
          <div className="overflow-hidden rounded-[24px]">
            <img
              src="/images/about3.webp"
              alt="Sweet Delights bakery kitchen"
              className="h-[470px] w-full object-cover max-sm:h-[320px]"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#ef3475]">
              Our Kitchen
            </span>

            <h2 className="font-jakarta mt-3 text-[clamp(32px,4vw,48px)] font-medium leading-tight">
              Freshly Prepared in a Clean, Caring Environment
            </h2>

            <p className="mt-6 text-[15px] leading-7 text-[#806e72]">
              Every order is prepared in a clean and organised kitchen using
              carefully selected ingredients. Our team follows consistent
              preparation, baking, cooling, decorating, and packaging
              processes.
            </p>

            <div className="mt-7 space-y-4 text-sm text-[#665357]">
              <div className="flex items-center gap-3">
                <FiUsers className="text-lg text-[#ef3475]" />
                <span>Experienced and passionate bakers</span>
              </div>

              <div className="flex items-center gap-3">
                <FiShield className="text-lg text-[#ef3475]" />
                <span>Strict hygiene and quality checks</span>
              </div>

              <div className="flex items-center gap-3">
                <FiPackage className="text-lg text-[#ef3475]" />
                <span>Fresh and secure packaging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7eded] py-16">
        <div className="mx-auto grid w-[min(100%-40px,1100px)] gap-8 text-center sm:grid-cols-2 lg:grid-cols-4 max-sm:w-[min(100%-24px,1100px)]">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-jakarta text-4xl font-bold text-[#ef3475]">
                {stat.value}
              </p>

              <p className="mt-2 text-sm font-medium text-[#665357]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fff8f6] py-20 text-center">
        <div className="mx-auto max-w-[720px] px-6">
          <h2 className="font-jakarta text-[clamp(32px,4vw,48px)] font-medium">
            Let Us Make Your Celebration Sweeter
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-[#806e72]">
            Browse our handcrafted cakes and pastries, or choose a custom order
            for your next special event.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/cakes"
              className="rounded-md bg-[#ef3475] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#d92a67]"
            >
              Shop Cakes
            </Link>

            <Link
              to="/pastries"
              className="rounded-md border border-[#ef3475] px-8 py-3.5 text-sm font-semibold text-[#ef3475] transition hover:bg-[#fff0f5]"
            >
              Shop Pastries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;