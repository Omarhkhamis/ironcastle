import type { Service } from "./data";

type Props = {
  services: Service[];
};

export default function Services({ services }: Props) {
  return (
    <section
      id="services"
      className="flex min-h-screen items-center px-5 py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 space-y-2">
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-accent">
            Services
          </div>
          <h2 className="text-3xl font-bold text-dark md:text-4xl dark:text-white">
            Full-spectrum metal solutions
          </h2>
          <p className="text-lg text-graymain dark:text-gray-200">
            Design, fabrication, and installation delivered with precision and
            safety at the core.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="grid gap-2 rounded-[14px] border border-graymid bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card dark:border-white/10 dark:bg-white/5"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-graymid/70 bg-gradient-to-br from-[#eef0f2] to-white text-accent text-lg font-bold dark:border-white/20 dark:from-white/10 dark:to-white/5">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h4 className="text-lg font-semibold text-dark dark:text-gray-200">
                {service.title}
              </h4>
              <p className="text-graymain dark:text-gray-200">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
