import { useEffect, useMemo, useRef, useState } from "react";
import type { Partner } from "./data";

type Props = {
  partners: Partner[];
};

export default function Partners({ partners }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const loopedPartners = useMemo(
    () => [...partners, ...partners, ...partners],
    [partners]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sectionWidth = container.scrollWidth / 3;
    container.scrollLeft = sectionWidth;

    const handleScroll = () => {
      const max = sectionWidth * 2;
      if (container.scrollLeft <= 0) {
        container.scrollLeft = sectionWidth;
      } else if (container.scrollLeft >= max) {
        container.scrollLeft = sectionWidth;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [partners]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(event.clientX);
    setScrollStart(container.scrollLeft);
    container.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    const delta = event.clientX - startX;
    container.scrollLeft = scrollStart - delta;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    const container = containerRef.current;
    if (container) {
      container.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      id="partners"
      className="flex items-center bg-graylight px-5 pb-16 pt-0 md:pb-20 md:pt-0 dark:bg-transparent"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 space-y-2">
          <div className="text-sm font-bold uppercase tracking-[0.08em] text-accent">
            Our Partners
          </div>
          <h2 className="text-3xl font-bold text-dark md:text-4xl dark:text-white">
            Brands that trust us
          </h2>
          <p className="text-lg text-graymain dark:text-gray-200">
            A selection of clients and collaborators we proudly work with.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="flex w-max select-none gap-4 px-6 py-6"
            style={{ touchAction: "pan-y" }}
          >
            {loopedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="min-w-[180px] rounded-xl border border-graymid bg-graylight px-4 py-3 text-center text-dark font-semibold dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <div className="mb-2 flex justify-center text-accent text-xl">
                  <i className={partner.icon} aria-hidden />
                </div>
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
