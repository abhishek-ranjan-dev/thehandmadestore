"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const CLIENTS: ClientLogo[] = [
  {
    name: "Client 1",
    src: "/clients/client-01.svg",
    width: 222,
    height: 83,
  },
  {
    name: "Client 2",
    src: "https://static.wixstatic.com/media/dc7de4_d4a1de980a0f4f1fb28af1daa9093407~mv2.webp/v1/fit/w_600,h_400,q_85,enc_avif,quality_auto/client-02.webp",
    width: 600,
    height: 400,
  },
  {
    name: "Client 3",
    src: "https://static.wixstatic.com/media/3581e8_33585c1076b04c68a91da83a86af352d~mv2.png/v1/fit/w_600,h_250,q_85,enc_avif,quality_auto/client-03.png",
    width: 600,
    height: 175,
  },
  {
    name: "Client 4",
    src: "https://static.wixstatic.com/media/dc7de4_f56b1d14fc274b33877d6e402826cca9~mv2.png/v1/fit/w_400,h_400,q_85,enc_avif,quality_auto/client-04.png",
    width: 400,
    height: 400,
  },
  {
    name: "Client 5",
    src: "https://static.wixstatic.com/media/dc7de4_c5ad586384f74ec8b2ce4f48eab73638~mv2.jpeg/v1/crop/x_0,y_12,w_200,h_171/fit/w_400,h_342/client-05.jpg",
    width: 400,
    height: 342,
  },
  {
    name: "Client 6",
    src: "https://static.wixstatic.com/media/dc7de4_5368d2423af24ef58b9edeea614a05dc~mv2.png/v1/fit/w_500,h_322,q_85,enc_avif,quality_auto/client-06.png",
    width: 500,
    height: 322,
  },
  {
    name: "Client 7",
    src: "https://static.wixstatic.com/media/dc7de4_87fa261d797e4d8cbd013827842de125~mv2.jpg/v1/fit/w_600,h_400,q_85,enc_avif,quality_auto/client-07.jpg",
    width: 600,
    height: 338,
  },
  {
    name: "Client 8",
    src: "https://static.wixstatic.com/media/dc7de4_2d81741a5ab9412fba295fa024c35e85~mv2.png/v1/crop/x_18,y_2,w_390,h_266/fit/w_400,h_273/client-08.png",
    width: 400,
    height: 273,
  },
];

const ROW_ONE = [...CLIENTS, ...CLIENTS];
const ROW_TWO_BASE = [...CLIENTS.slice(4), ...CLIENTS.slice(0, 4)];
const ROW_TWO = [...ROW_TWO_BASE, ...ROW_TWO_BASE];

function LogoCard({ client }: { client: ClientLogo }) {
  return (
    <div className="flex h-24 w-32 flex-none items-center justify-center rounded-2xl border border-ths-earth/12 bg-white p-2 shadow-[0_1px_2px_rgba(23,17,13,0.03)] sm:h-28 sm:w-44 sm:rounded-3xl md:h-32 md:w-52 md:p-3 lg:w-56">
      <Image
        src={client.src}
        alt={client.name}
        width={client.width}
        height={client.height}
        loading="lazy"
        className="h-16 w-auto max-w-full object-contain sm:h-20 md:h-24 lg:h-28"
        unoptimized={client.src.endsWith(".svg")}
      />
    </div>
  );
}

export function ClientsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-in-view={inView}
      className="marquee-group relative w-full overflow-hidden pb-14 sm:pb-20 md:pb-24"
    >
      <div
        className="marquee-mask flex flex-col gap-3 sm:gap-4 md:gap-6"
        aria-label="Client logos"
      >
        <ul className="marquee-track gap-3 sm:gap-4 md:gap-6">
          {ROW_ONE.map((client, i) => (
            <li key={`row1-${client.src}-${i}`} aria-hidden={i >= CLIENTS.length}>
              <LogoCard client={client} />
            </li>
          ))}
        </ul>
        <ul
          className="marquee-track-reverse gap-3 sm:gap-4 md:gap-6"
          aria-hidden="true"
        >
          {ROW_TWO.map((client, i) => (
            <li key={`row2-${client.src}-${i}`}>
              <LogoCard client={client} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
