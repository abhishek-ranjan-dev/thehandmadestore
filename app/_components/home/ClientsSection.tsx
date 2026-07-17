import { ClientsMarquee } from "@/app/_components/home/ClientsMarquee";

export function ClientsSection() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="w-full border-t border-ths-earth/10 bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
            Our clients
          </p>
          <h2
            id="clients-heading"
            className="mt-4 font-display text-3xl leading-tight tracking-tight text-ths-ink md:text-4xl lg:text-[2.75rem]"
          >
            Every client, a
            <span className="text-ths-earth"> long-term partner.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ths-ink/70 md:text-lg">
            A few of the teams and institutions we&rsquo;ve made things for.
          </p>
        </div>
      </div>

      <ClientsMarquee />
    </section>
  );
}
