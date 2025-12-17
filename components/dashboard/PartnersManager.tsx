"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { deletePartner, savePartner } from "../../app/dashboard/actions";
import { useToast } from "./ToastProvider";
import { iconButtonClass } from "./ui";
import UploadButton from "./UploadButton";
import MediaPickerButton from "./MediaPickerButton";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

type Partner = {
  id: number;
  name: string;
  url?: string | null;
  logoUrl?: string | null;
};

type Props = {
  partners: Partner[];
};

export default function PartnersManager({ partners }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [isSubmitting, startTransition] = useTransition();
  const { showToast } = useToast();
  const logoRef = useRef<HTMLInputElement>(null);

  const openModal = (partner?: Partner) => {
    setEditing(partner ?? null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setEditing(null);
    setModalOpen(false);
  };

  const formAction = (formData: FormData, message: string) => {
    startTransition(async () => {
      await savePartner(formData);
      closeModal();
      showToast(message);
    });
  };

  useEffect(() => {
    if (!modalOpen) return;
    if (logoRef.current) {
      logoRef.current.value = editing?.logoUrl ?? "";
    }
  }, [editing, modalOpen]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.4em] text-accent">Partners</p>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded-xl border border-accent px-4 py-2 text-sm font-medium text-accent transition hover:-translate-y-0.5"
        >
          Add Partner
        </button>
      </div>

      {partners.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-graymid/70 bg-white/80 p-6 text-center text-gray-500 dark:border-white/20 dark:bg-white/5 dark:text-gray-300">
          No partners yet. Click “Add Partner” to highlight collaborators.
        </div>
      ) : (
        <div className="space-y-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-between rounded-2xl border border-graymid/70 bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-[#10141d]"
            >
              <div className="flex items-center gap-3">
                {partner.logoUrl ? (
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-graymid/70 bg-white dark:border-white/10">
                    <img src={partner.logoUrl} alt={partner.name} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-graymid/60 text-sm font-semibold text-gray-600 dark:border-white/10 dark:text-gray-300">
                    {partner.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-base font-semibold text-dark dark:text-white">{partner.name}</p>
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-accent underline-offset-2 hover:underline"
                    >
                      {partner.url}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-300">No link provided</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openModal(partner)}
                  className={iconButtonClass}
                  aria-label="Edit partner"
                >
                  <i className="fas fa-pen" aria-hidden />
                </button>
                <form
                  action={async (formData) => {
                    await deletePartner(formData);
                    showToast("Partner removed");
                  }}
                >
                  <input type="hidden" name="id" value={partner.id} />
                  <ConfirmDeleteButton
                    type="submit"
                    message={`Are you sure you want to delete "${partner.name}"?`}
                    className={`${iconButtonClass} border-red-400 text-red-500 hover:border-red-500 hover:text-red-500 dark:border-red-500/40`}
                    aria-label="Delete partner"
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
          <div className="relative w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#070a10] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full border border-red-500/40 px-3 py-1 text-xs text-red-400 transition hover:border-red-500 hover:text-red-300"
              aria-label="Close"
            >
              <i className="fas fa-times" aria-hidden />
            </button>
            <h3 className="mb-4 text-2xl font-semibold">{editing ? `Edit: ${editing.name}` : "Add Partner"}</h3>
            <form
              action={(formData) => formAction(formData, editing ? "Partner updated!" : "Partner created!")}
              className="grid gap-3"
            >
              <input type="hidden" name="id" defaultValue={editing?.id ?? ""} />
              <label className="grid gap-1 text-sm font-medium">
                Name
                <input
                  name="name"
                  required
                  defaultValue={editing?.name ?? ""}
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Link (optional)
                <input
                  name="url"
                  defaultValue={editing?.url ?? ""}
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Logo URL
                <div className="flex items-center gap-2">
                  <input
                    ref={logoRef}
                    name="logoUrl"
                    required
                    defaultValue={editing?.logoUrl ?? ""}
                    className="flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  <UploadButton
                    target="partner"
                    onUploaded={(url) => {
                      if (logoRef.current) {
                        logoRef.current.value = url;
                      }
                    }}
                  />
                  <MediaPickerButton
                    onSelect={(url) => {
                      if (logoRef.current) {
                        logoRef.current.value = url;
                      }
                    }}
                  />
                </div>
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
                  {isSubmitting ? "Saving..." : "Save Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
