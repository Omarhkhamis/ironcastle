import type { WhyUsItem } from "./data";

type Props = {
  items: WhyUsItem[];
};

export default function WhyUs({ items }: Props) {
  return (
    <section
      id="why-us"
      className="flex min-h-screen items-center bg-graylight px-5 py-16 md:py-20 dark:bg-transparent"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 space-y-2">
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-accent">
            Why Choose Us
          </div>
          <h2 className="text-3xl font-bold text-dark md:text-4xl dark:text-gray-200">
            Built for reliability
          </h2>
          <p className="text-lg text-graymain dark:text-gray-200">
            We combine engineering rigor with responsive service to deliver
            metalwork that meets spec, schedule, and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.title}
              className="grid grid-cols-[auto,1fr] items-start gap-3 rounded-[14px] border border-graymid bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-[#111] font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-dark dark:text-gray-200">
                  {item.title}
                </h3>
                <p className="text-graymain">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
