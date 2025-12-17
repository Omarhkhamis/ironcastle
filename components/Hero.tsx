type Props = {
  onNavigate: (target: string) => void;
  heroImageUrl?: string | null;
};

const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1800&q=80";

export default function Hero({ onNavigate, heroImageUrl }: Props) {
  const backgroundImage = heroImageUrl || DEFAULT_HERO;
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center px-5 py-24 md:py-28"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/10 dark:from-black/70 dark:via-black/50 dark:to-black/20" />

      <div className="relative mx-auto max-w-5xl w-full">
        <div className="max-w-4xl rounded-[26px] border border-white/25 bg-white/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-white/15 dark:bg-white/10">
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-accent">
            Steel & Aluminum
          </div>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-dark drop-shadow sm:text-5xl dark:text-white">
            Steel &amp; Aluminum Solutions Built to Last
          </h1>
          <p className="mt-4 text-lg text-graymain dark:text-gray-200">
            High-quality fabrication, installation, and custom metal works for
            residential, commercial, and industrial projects. Precision,
            durability, and trusted delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate("services")}
              className="rounded-2xl bg-accent px-6 py-3 font-semibold text-[#111] shadow-[0_14px_32px_rgba(241,143,3,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(241,143,3,0.4)]"
            >
              View Our Services
            </button>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="rounded-2xl border border-white/70 bg-white/80 px-6 py-3 font-semibold text-dark shadow-soft transition hover:-translate-y-[1px] hover:border-accent hover:shadow-card dark:border-white/30 dark:bg-white/10 dark:text-white"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
