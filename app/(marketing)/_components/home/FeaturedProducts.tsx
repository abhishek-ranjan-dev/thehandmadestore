import Image from "next/image";
import Link from "next/link";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

const SHOP_URL = "/shop";

type Product = {
  name: string;
  price: string;
  href: string;
  image: string;
  alt: string;
  ribbon?: "New" | "Bestseller";
  objectPosition?: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Cork Corporate Gift Hamper",
    price: "₹800",
    href: "https://thehandmadestore.co.in/product-page/cork-corporate-gift-hamper",
    image:
      "https://static.wixstatic.com/media/dc7de4_0e1986de468f4b4588fc559759ea5a99~mv2.jpeg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/cork-hamper.jpg",
    alt: "Cork corporate gift hamper laid out with contents",
    ribbon: "Bestseller",
    objectPosition: "50% 50%",
  },
  {
    name: "Plantable Stationery Box",
    price: "₹800",
    href: "https://thehandmadestore.co.in/product-page/plantable-stationery-box",
    image:
      "https://static.wixstatic.com/media/dc7de4_610f1ec5faac4257a6265c380a8495db~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/stationery-box.jpg",
    alt: "Plantable stationery box open, showing seed-paper contents",
    ribbon: "New",
    objectPosition: "50% 45%",
  },
  {
    name: "Corporate Hamper",
    price: "₹350",
    href: "https://thehandmadestore.co.in/product-page/corporate-hamper",
    image:
      "https://static.wixstatic.com/media/dc7de4_e258e7ff658845608ee4c995ecbf3bb4~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/corporate-hamper.jpg",
    alt: "Corporate gift hamper wrapped in fabric",
    ribbon: "Bestseller",
    objectPosition: "50% 50%",
  },
  {
    name: "Kraft Paper Cube Organiser",
    price: "₹400",
    href: "https://thehandmadestore.co.in/product-page/kraft-paper-cube-organiser",
    image:
      "https://static.wixstatic.com/media/dc7de4_1cd39159ad60405fa98129fa11665323~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/kraft-cube.jpg",
    alt: "Kraft paper cube desk organiser",
    objectPosition: "50% 50%",
  },
  {
    name: "Plantable Chit Pad",
    price: "₹300",
    href: "https://thehandmadestore.co.in/product-page/plantable-chit-pad",
    image:
      "https://static.wixstatic.com/media/dc7de4_6ff33ff8ac0f4b48b90645642731bd74~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/chit-pad.jpg",
    alt: "Plantable chit pad, notes on seed paper",
    ribbon: "New",
    objectPosition: "50% 50%",
  },
  {
    name: "Plantable Notepad",
    price: "₹180",
    href: "https://thehandmadestore.co.in/product-page/plantable-notepad",
    image:
      "https://static.wixstatic.com/media/3581e8_8873419ef5f24f438502ee9b28d0130a~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/plantable-notepad.jpg",
    alt: "Plantable notepad with seed-paper cover",
    ribbon: "New",
    objectPosition: "50% 35%",
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <li>
      <Link
        href={product.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block"
      >
        <div className="relative w-full overflow-hidden bg-ths-sand/60">
          <div className="relative aspect-square w-full">
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{
                objectPosition: product.objectPosition ?? "50% 50%",
                transitionTimingFunction: EASE_APPLE_OUT,
              }}
              priority={index < 3}
            />
          </div>
          {product.ribbon ? (
            <span className="absolute left-2.5 top-2.5 inline-flex items-center bg-ths-cream/95 px-2 py-0.5 text-[9px] uppercase tracking-[0.28em] text-ths-ink sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[10px] sm:tracking-[0.3em]">
              {product.ribbon}
            </span>
          ) : null}
        </div>
        <div className="mt-3 flex items-start justify-between gap-2 sm:mt-5 sm:gap-4">
          <h3 className="font-display text-sm leading-snug text-ths-ink sm:text-lg md:text-xl">
            {product.name}
          </h3>
          <span className="whitespace-nowrap pt-0.5 text-xs text-ths-ink/70 sm:pt-1 sm:text-sm md:text-base">
            {product.price}
          </span>
        </div>
      </Link>
    </li>
  );
}

export function FeaturedProducts() {
  return (
    <section
      id="shop"
      aria-labelledby="featured-products-heading"
      className="w-full bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-6 sm:gap-10 md:grid-cols-12 md:items-end md:gap-16">
          <div className="md:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ths-earth sm:text-xs">
              The shop
            </p>
            <h2
              id="featured-products-heading"
              className="mt-3 font-display text-3xl leading-tight tracking-tight text-ths-ink sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Made by hand.
              <br />
              <span className="text-ths-earth">Ready for yours.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-[15px] leading-relaxed text-ths-ink/80 sm:text-base md:text-lg">
              A short selection from our shop &mdash; hampers, plantable
              stationery, and everyday pieces we&rsquo;re proud of. Every item
              is made with the artisan communities we work with, in small,
              considered batches.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-14 sm:gap-x-6 sm:gap-y-14 md:mt-20 md:gap-x-8 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.href} product={product} index={index} />
          ))}
        </ul>

        <div className="mt-12 flex justify-center sm:mt-16 md:mt-20">
          <Link
            href={SHOP_URL}
            className="group inline-flex w-full items-center justify-center gap-3 border border-ths-ink bg-ths-ink px-8 py-4 text-xs uppercase tracking-[0.3em] text-ths-cream transition-colors duration-300 hover:bg-transparent hover:text-ths-ink sm:w-auto"
          >
            Explore all products
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              style={{ transitionTimingFunction: EASE_APPLE_OUT }}
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
