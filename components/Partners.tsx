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

        {partners.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-graymid/80 bg-white p-8 text-center text-graymain dark:border-white/20 dark:bg-white/5 dark:text-gray-200">
            Add partners inside the dashboard to highlight who trusts your work.
          </div>
        ) : (
          <div
            ref={containerRef}
            className="relative overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="flex w-full min-w-full select-none py-6" style={{ touchAction: "pan-y" }}>
              {loopedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex h-32 shrink-0 basis-1/2 items-center justify-center px-4 py-4 md:basis-1/4"
                >
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="h-full max-h-20 w-auto object-contain"
                    />
                  ) : partner.icon ? (
                    <i className={`${partner.icon} text-3xl text-accent`} aria-hidden />
                  ) : (
                    <span className="text-lg font-semibold text-dark dark:text-white">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
