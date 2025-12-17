"use client";

import { useMemo, useState, useTransition } from "react";
import { deleteService, saveService } from "../../app/dashboard/actions";
import { useToast } from "./ToastProvider";
import { iconButtonClass } from "./ui";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  order: number;
};

type Props = {
  services: Service[];
};

export default function ServicesManager({ services }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isSubmitting, startTransition] = useTransition();
  const { showToast } = useToast();

  const sorted = useMemo(() => [...services].sort((a, b) => a.order - b.order), [services]);

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setModalOpen(false);
    setEditing(null);
  };

  const formAction = (formData: FormData, message: string) => {
    startTransition(async () => {
      await saveService(formData);
      closeModal();
      showToast(message);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.4em] text-accent">Services</p>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-xl border border-accent px-4 py-2 text-sm font-medium text-accent transition hover:-translate-y-0.5"
        >
          Add Service
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-graymid/70 bg-white/80 p-6 text-center text-gray-500 dark:border-white/20 dark:bg-white/5 dark:text-gray-300">
          No services yet. Click “Add Service” to publish your first capability.
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((service) => (
            <div
              key={service.id}
              className="flex items-start justify-between rounded-2xl border border-graymid/70 bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-[#10141d]"
            >
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-dark dark:text-white">{service.title}</p>
                  <span className="rounded-full border border-graymid/60 px-2 py-0.5 text-xs text-gray-500 dark:border-white/20 dark:text-gray-300">
                    Order {service.order}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(service)}
                  className={iconButtonClass}
                  aria-label="Edit service"
                >
                  <i className="fas fa-pen" aria-hidden />
                </button>
                <form
                  action={async (formData) => {
                    await deleteService(formData);
                    showToast("Service removed");
                  }}
                >
                  <input type="hidden" name="id" value={service.id} />
                  <ConfirmDeleteButton
                    type="submit"
                    message={`Are you sure you want to delete "${service.title}"?`}
                    className={`${iconButtonClass} border-red-400 text-red-500 hover:border-red-500 hover:text-red-500 dark:border-red-500/40`}
                    aria-label="Delete service"
                  >
                    <i className="fas fa-times" aria-hidden />
                  </ConfirmDeleteButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 py-[10vh]">
          <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#070a10] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full border border-red-500/40 px-3 py-1 text-xs text-red-400 transition hover:border-red-500 hover:text-red-300"
              aria-label="Close"
            >
              <i className="fas fa-times" aria-hidden />
            </button>
            <h3 className="mb-4 text-2xl font-semibold">
              {editing ? `Edit: ${editing.title}` : "Add Service"}
            </h3>
            <form
              action={(formData) => formAction(formData, editing ? "Service updated!" : "Service created!")}
              className="grid gap-3"
            >
              <input type="hidden" name="id" defaultValue={editing?.id ?? ""} />
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium">
                  Title
                  <input
                    name="title"
                    required
                    defaultValue={editing?.title ?? ""}
                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </label>
                <label className="grid gap-1 text-sm font-medium">
                  Order
                  <input
                    name="order"
                    type="number"
                    defaultValue={editing?.order?.toString() ?? "1"}
                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </label>
              </div>
              <label className="grid gap-1 text-sm font-medium">
                Description
                <textarea
                  name="description"
                  required
                  defaultValue={editing?.description ?? ""}
                  rows={4}
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Icon class (optional)
                <input
                  name="icon"
                  defaultValue={editing?.icon ?? ""}
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-gray-200 transition hover:-translate-y-0.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-[#111] transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
