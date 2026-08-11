import { ClientsMarquee } from "./ClientsMarquee";

export function ClientsSection() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="w-full border-t border-ths-earth/10 bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-ths-earth sm:text-xs">
            Our clients
          </p>
          <h2
            id="clients-heading"
            className="mt-3 font-display text-[1.75rem] leading-tight tracking-tight text-ths-ink sm:mt-4 sm:text-3xl md:text-4xl lg:text-[2.75rem]"
          >
            Every client, a
            <span className="text-ths-earth"> long-term partner.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ths-ink/70 sm:mt-5 sm:text-base md:text-lg">
            A few of the teams and institutions we&rsquo;ve made things for.
          </p>
        </div>
      </div>

      <ClientsMarquee />
    </section>
  );
}
