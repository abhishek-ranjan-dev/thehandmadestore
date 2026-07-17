const SITE_URL = "https://www.thehandmadestore.co.in";
const BRAND_MARK =
  "https://static.wixstatic.com/media/3581e8_bd79e60756984a8db3e9cb306751552c~mv2.png/v1/fill/w_512,h_460,al_c,q_90,enc_avif,quality_auto/mark.png";

const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "The Hand Made Store",
  url: SITE_URL,
  logo: BRAND_MARK,
  description:
    "A women-owned local business partnering with indigenous Indian artisans for handcrafted, ethical jewelry, home decor, and lifestyle products.",
  foundingDate: "2019",
  founder: { "@type": "Person", name: "Ashwini R. Kurup" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "ths.thehandmadestore@gmail.com",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.instagram.com/thehandmadestore.co.in/",
    "https://www.linkedin.com/company/the-hand-made-store/",
  ],
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "The Hand Made Store",
  description:
    "Handcrafted, ethical products from indigenous Indian artisans.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_LD) }}
      />
    </>
  );
}
