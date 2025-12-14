import type { Stat } from "./data";

type Props = {
  stats: Stat[];
};

export default function About({ stats }: Props) {
  return (
    <section
      id="about"
      className="flex items-center px-5 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 items-start gap-7">
          <div className="space-y-3">
            <div className="text-sm font-bold uppercase tracking-[0.08em] text-accent">
              About Us
            </div>
            <h2 className="text-3xl font-bold text-dark md:text-4xl dark:text-white">
              Industrial precision with a human touch
            </h2>
            <p className="text-lg text-graymain dark:text-gray-200">
              We are a specialized steel and aluminum fabrication company
              delivering durable, precise, and customized metal solutions for
              diverse industries.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-graymid/70 bg-graylight px-4 py-6 text-center shadow-soft dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-graymid/70 bg-white text-accent shadow-soft dark:border-white/20 dark:bg-white/10">
                    <i className={stat.icon} />
                  </span>
                  <strong className="text-3xl font-bold text-dark dark:text-white">
                    {stat.value}
                  </strong>
                </div>
                <span className="text-base text-graymain dark:text-gray-200">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
