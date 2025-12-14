import type { NavItem, Service } from "./data";

type Props = {
  navItems: NavItem[];
  services: Service[];
  onNavigate: (target: string) => void;
};

export default function Footer({ navItems, services, onNavigate }: Props) {
  return (
    <footer className="border-t border-graymid bg-white px-5 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex items-center gap-3 text-dark">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-[#ffb341] text-white shadow-accent">
            IC
          </span>
          <div>
            <div className="font-semibold">Iron Castle Metal Works</div>
            <p className="text-sm text-graymain">
              Steel and aluminum fabrication engineered for longevity and
              precision.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-graymain">
          <strong className="text-dark">Quick Links</strong>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={`footer-${item.target}`}
                href={`#${item.target}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.target);
                }}
                className="hover:text-dark"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-graymain">
          <strong className="text-dark">Services</strong>
          <div className="grid gap-2">
            {services.map((service) => (
              <a
                key={`footer-service-${service.title}`}
                href="#services"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("services");
                }}
                className="hover:text-dark"
              >
                {service.title}
              </a>
            ))}
          </div>
          <span className="block pt-2">&copy; 2023 SteelCraft</span>
        </div>
      </div>
    </footer>
  );
}
