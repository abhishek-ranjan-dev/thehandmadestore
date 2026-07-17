export type CategorySlug =
  | "all-products"
  | "festive-hampers"
  | "eco-friendly-stationery"
  | "corporate-gifts"
  | "new-in"
  | "best-sellers";

export type Category = {
  slug: CategorySlug;
  label: string;
};

export const CATEGORIES: Category[] = [
  { slug: "all-products", label: "All products" },
  { slug: "festive-hampers", label: "Festive Hampers" },
  { slug: "eco-friendly-stationery", label: "Eco-Friendly Stationery" },
  { slug: "corporate-gifts", label: "Corporate Gifts" },
  { slug: "new-in", label: "New In" },
  { slug: "best-sellers", label: "Best Sellers" },
];

export type SortKey =
  | "recommended"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price (low to high)" },
  { value: "price-desc", label: "Price (high to low)" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  image: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  href: string;
  categories: Exclude<CategorySlug, "all-products">[];
  ribbon?: "New" | "Bestseller";
  dateAdded: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "cork-corporate-gift-hamper",
    name: "Cork Corporate Gift Hamper",
    price: 800,
    formattedPrice: "₹800",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_0e1986de468f4b4588fc559759ea5a99~mv2.jpeg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/cork-hamper.jpg",
      alt: "Cork corporate gift hamper with wooden accessories",
      objectPosition: "50% 50%",
    },
    href: "https://thehandmadestore.co.in/product-page/cork-corporate-gift-hamper",
    categories: ["corporate-gifts", "festive-hampers", "best-sellers"],
    ribbon: "Bestseller",
    dateAdded: "2024-09-01",
  },
  {
    id: "corporate-hamper",
    name: "Corporate Hamper",
    price: 350,
    formattedPrice: "₹350",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_e258e7ff658845608ee4c995ecbf3bb4~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/corporate-hamper.jpg",
      alt: "Corporate hamper wrapped in fabric",
      objectPosition: "50% 50%",
    },
    href: "https://thehandmadestore.co.in/product-page/corporate-hamper",
    categories: ["corporate-gifts", "festive-hampers", "best-sellers"],
    ribbon: "Bestseller",
    dateAdded: "2024-08-10",
  },
  {
    id: "kraft-paper-cube-organiser",
    name: "Kraft Paper Cube Organiser",
    price: 400,
    formattedPrice: "₹400",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_1cd39159ad60405fa98129fa11665323~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/kraft-cube.jpg",
      alt: "Kraft paper cube desk organiser",
      objectPosition: "50% 50%",
    },
    href: "https://thehandmadestore.co.in/product-page/kraft-paper-cube-organiser",
    categories: ["eco-friendly-stationery", "corporate-gifts"],
    dateAdded: "2024-11-15",
  },
  {
    id: "plantable-chit-pad",
    name: "Plantable Chit Pad",
    price: 300,
    formattedPrice: "₹300",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_6ff33ff8ac0f4b48b90645642731bd74~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/chit-pad.jpg",
      alt: "Plantable chit pad made from seed paper",
      objectPosition: "50% 50%",
    },
    href: "https://thehandmadestore.co.in/product-page/plantable-chit-pad",
    categories: ["eco-friendly-stationery", "new-in"],
    ribbon: "New",
    dateAdded: "2025-05-20",
  },
  {
    id: "plantable-stationery-box",
    name: "Plantable Stationery Box",
    price: 800,
    formattedPrice: "₹800",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_610f1ec5faac4257a6265c380a8495db~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/stationery-box.jpg",
      alt: "Plantable stationery gift box, open to show contents",
      objectPosition: "50% 45%",
    },
    href: "https://thehandmadestore.co.in/product-page/plantable-stationery-box",
    categories: ["eco-friendly-stationery", "new-in", "corporate-gifts"],
    ribbon: "New",
    dateAdded: "2025-06-01",
  },
  {
    id: "plantable-calendar",
    name: "Plantable Calendar",
    price: 300,
    formattedPrice: "₹300",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_e94fe6c1936c494796aa0a61e3c8097a~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/plantable-calendar.jpg",
      alt: "Plantable seed-paper desk calendar",
      objectPosition: "50% 50%",
    },
    href: "https://thehandmadestore.co.in/product-page/plantable-calendar",
    categories: ["eco-friendly-stationery", "new-in"],
    ribbon: "New",
    dateAdded: "2025-06-10",
  },
  {
    id: "plantable-pencil",
    name: "Plantable Pencil",
    price: 12,
    formattedPrice: "₹12",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_2a5599c1650b476cb0d4107ee7b81cf9~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/plantable-pencil.jpg",
      alt: "Plantable pencils with seed capsules",
      objectPosition: "50% 50%",
    },
    href: "https://thehandmadestore.co.in/product-page/plantable-pencil-1",
    categories: ["eco-friendly-stationery", "new-in"],
    ribbon: "New",
    dateAdded: "2025-06-15",
  },
  {
    id: "plantable-notepad",
    name: "Plantable Notepad",
    price: 180,
    formattedPrice: "₹180",
    image: {
      src: "https://static.wixstatic.com/media/3581e8_8873419ef5f24f438502ee9b28d0130a~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/plantable-notepad.jpg",
      alt: "Plantable notepad with seed paper cover",
      objectPosition: "50% 35%",
    },
    href: "https://thehandmadestore.co.in/product-page/plantable-notepad",
    categories: ["eco-friendly-stationery", "new-in"],
    ribbon: "New",
    dateAdded: "2025-06-20",
  },
];
