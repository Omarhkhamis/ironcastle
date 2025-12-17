export const cardClass =
  "rounded-2xl border border-graymid/70 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#0f1116]";

export const actionButtonClass =
  "rounded-xl bg-accent px-4 py-2 font-semibold text-[#111] transition hover:-translate-y-[1px]";

export const outlineButtonClass =
  "rounded-xl border border-red-400/80 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500/10 dark:border-red-500/40";

export const iconButtonClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-graymid/70 bg-white/5 text-gray-600 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:border-white/20 dark:text-gray-200";

export function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{title}</p>
      <p className="text-2xl font-semibold text-dark dark:text-white">{description}</p>
    </div>
  );
}

type FieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

export function TextField({
  name,
  label,
  defaultValue,
  type = "text",
  required,
  placeholder
}: FieldProps) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-dark dark:text-white">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-graymid/60 bg-white px-3 py-2 text-base font-normal text-dark focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/20 dark:bg-white/5 dark:text-white"
      />
    </label>
  );
}

type TextAreaProps = FieldProps & { rows?: number };

export function TextAreaField({
  name,
  label,
  defaultValue,
  rows = 4,
  required,
  placeholder
}: TextAreaProps) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-dark dark:text-white">
      {label}
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-graymid/60 bg-white px-3 py-2 text-base font-normal text-dark focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/20 dark:bg-white/5 dark:text-white"
      />
    </label>
  );
}
