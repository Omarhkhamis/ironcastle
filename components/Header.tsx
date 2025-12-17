type Props = {
  navItems: { label: string; target: string }[];
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavigate: (target: string) => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
};

export default function Header({
  navItems,
  menuOpen,
  onToggleMenu,
  onNavigate,
  onToggleTheme,
  theme,
}: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-graymid/80 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#0f1116]/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("top");
          }}
          className="flex items-center gap-3 text-lg font-semibold text-dark dark:text-white"
        >
          <img
            src="/logo.png"
            alt="Iron Castle Metal Works logo"
            className="h-10 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-6 text-base font-normal text-graymain dark:text-gray-200">
            {navItems.map((item) => (
              <li key={item.target}>
                <a
                  className="rounded-lg px-2 py-1 transition hover:bg-graylight hover:text-dark dark:hover:bg-white/10 dark:hover:text-white"
                  href={`#${item.target}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(item.target);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("contact");
                }}
                className="rounded-xl bg-accent px-4 py-2 font-semibold text-[#111] shadow-accent transition hover:translate-y-[-1px] hover:shadow-accentHover"
              >
                Request a Quote
              </button>
            </li>
          </ul>
          <button
            type="button"
            onClick={onToggleTheme}
            className="grid h-11 w-11 place-items-center rounded-xl border border-graymid/70 bg-white text-dark shadow-soft transition hover:shadow-card dark:border-white/20 dark:bg-white/10 dark:text-white"
          >
            <span className="sr-only">Toggle theme</span>
            {theme === "dark" ? (
              <i className="fas fa-sun" aria-hidden />
            ) : (
              <i className="fas fa-moon" aria-hidden />
            )}
          </button>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={onToggleMenu}
          className="grid h-11 w-11 place-items-center rounded-xl border border-graymid/70 bg-white text-dark shadow-soft transition hover:shadow-card md:hidden dark:border-white/20 dark:bg-white/10 dark:text-white"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[5px]">
            <span className="block h-[3px] w-6 rounded-full bg-dark dark:bg-white" />
            <span className="block h-[3px] w-6 rounded-full bg-dark dark:bg-white" />
            <span className="block h-[3px] w-6 rounded-full bg-dark dark:bg-white" />
          </div>
        </button>
      </div>

      <div
        className={`md:hidden ${
          menuOpen
            ? "fixed inset-0 z-50 h-screen w-screen bg-white text-dark dark:bg-[#0b0f14] dark:text-white"
            : "hidden"
        }`}
      >
        <ul className="flex h-full w-full flex-col gap-4 overflow-y-auto bg-white px-6 py-8 text-base font-semibold dark:bg-[#0b0f14]">
          {navItems.map((item) => (
            <li key={`mobile-${item.target}`}>
              <a
                className="block rounded-lg px-3 py-3 transition hover:bg-graylight hover:text-dark dark:hover:bg-white/10 dark:hover:text-white"
                href={`#${item.target}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.target);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                onNavigate("contact");
              }}
              className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-[#111] shadow-accent transition hover:translate-y-[-1px] hover:shadow-accentHover"
            >
              Request a Quote
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-full rounded-xl border border-graymid/70 bg-white px-4 py-3 font-semibold text-dark shadow-soft transition hover:shadow-card dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
