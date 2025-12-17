"use client";

import { useState, useTransition, useRef } from "react";
import { actionButtonClass, outlineButtonClass, TextField, iconButtonClass } from "./ui";
import { useToast } from "./ToastProvider";
import { deleteSocialLink, saveSetting, saveSocialLink } from "../../app/dashboard/actions";
import UploadButton from "./UploadButton";
import MediaPickerButton from "./MediaPickerButton";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

type SettingData = {
  id?: number | null;
  siteName?: string | null;
  adminEmail?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  heroImageUrl?: string | null;
};

type SocialLink = {
  id: number;
  platform: string;
  url: string;
};

const socialPlatforms = [
  { label: "Facebook", value: "Facebook" },
  { label: "Instagram", value: "Instagram" },
  { label: "TikTok", value: "TikTok" },
  { label: "WhatsApp", value: "WhatsApp" }
];

export function SettingsForm({ setting }: { setting: SettingData | null | undefined }) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const logoRef = useRef<HTMLInputElement>(null);
  const faviconRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLInputElement>(null);

  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      await saveSetting(formData);
      showToast("Settings saved");
    });
  };

  return (
    <form action={handleAction} className="space-y-5">
      <input type="hidden" name="id" defaultValue={setting?.id ?? ""} />
      <TextField name="siteName" label="Site name" defaultValue={setting?.siteName} />

      <label className="grid gap-1 text-sm font-semibold text-dark dark:text-white">
        Logo URL
        <div className="flex gap-2">
          <input
            ref={logoRef}
            name="logoUrl"
            defaultValue={setting?.logoUrl ?? ""}
            className="flex-1 rounded-xl border border-graymid/60 bg-white px-3 py-2 text-base font-normal text-dark focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/20 dark:bg-white/5 dark:text-white"
          />
          <UploadButton target="general" onUploaded={(url) => logoRef.current && (logoRef.current.value = url)} />
          <MediaPickerButton
            onSelect={(url) => {
              if (logoRef.current) {
                logoRef.current.value = url;
              }
            }}
          />
        </div>
      </label>
      <label className="grid gap-1 text-sm font-semibold text-dark dark:text-white">
        Favicon URL
        <div className="flex gap-2">
          <input
            ref={faviconRef}
            name="faviconUrl"
            defaultValue={setting?.faviconUrl ?? ""}
            className="flex-1 rounded-xl border border-graymid/60 bg-white px-3 py-2 text-base font-normal text-dark focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/20 dark:bg-white/5 dark:text-white"
          />
          <UploadButton
            target="general"
            onUploaded={(url) => faviconRef.current && (faviconRef.current.value = url)}
          />
          <MediaPickerButton
            onSelect={(url) => {
              if (faviconRef.current) {
                faviconRef.current.value = url;
              }
            }}
          />
        </div>
      </label>
      <label className="grid gap-1 text-sm font-semibold text-dark dark:text-white">
        Hero image URL
        <div className="flex gap-2">
          <input
            ref={heroRef}
            name="heroImageUrl"
            defaultValue={setting?.heroImageUrl ?? ""}
            className="flex-1 rounded-xl border border-graymid/60 bg-white px-3 py-2 text-base font-normal text-dark focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/20 dark:bg-white/5 dark:text-white"
          />
          <UploadButton
            target="general"
            onUploaded={(url) => heroRef.current && (heroRef.current.value = url)}
          />
          <MediaPickerButton
            onSelect={(url) => {
              if (heroRef.current) {
                heroRef.current.value = url;
              }
            }}
          />
        </div>
      </label>

      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className={`${actionButtonClass} disabled:opacity-60`}>
          {isPending ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}

export function SocialLinkForm({
  settingId,
  social
}: {
  settingId: number;
  social?: SocialLink;
}) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(!social);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await saveSocialLink(formData);
      showToast(social ? "Social link updated" : "Social link added");
      setEditing(false);
    });
  };

  const handleDelete = async (formData: FormData) => {
    await deleteSocialLink(formData);
    showToast("Social link removed");
  };

  const iconClass = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return "fab fa-facebook-f";
      case "instagram":
        return "fab fa-instagram";
      case "tiktok":
        return "fab fa-tiktok";
      case "whatsapp":
        return "fab fa-whatsapp";
      default:
        return "fas fa-share-alt";
    }
  };

  return (
    <form
      action={handleSubmit}
      className="grid gap-2 rounded-xl border border-graymid/50 p-3 dark:border-white/10"
    >
      {social ? <input type="hidden" name="id" defaultValue={social.id} /> : null}
      <input type="hidden" name="settingId" defaultValue={settingId} />

      {social && !editing ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-graymid/60 bg-white/10 text-accent dark:border-white/20">
              <i className={iconClass(social.platform)} aria-hidden />
            </span>
            <div className="text-sm">
              <p className="font-semibold text-dark dark:text-white">{social.platform}</p>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-graymain underline-offset-2 hover:underline dark:text-gray-200"
              >
                {social.url}
              </a>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className={iconButtonClass}
              aria-label="Edit link"
            >
              <i className="fas fa-pen" aria-hidden />
            </button>
            <ConfirmDeleteButton
              type="submit"
              formAction={handleDelete}
              message={`Are you sure you want to delete ${social.platform}?`}
              className={`${iconButtonClass} border-red-400 text-red-500 hover:border-red-500 hover:text-red-500 dark:border-red-500/40`}
              aria-label="Delete link"
            >
              <i className="fas fa-times" aria-hidden />
            </ConfirmDeleteButton>
          </div>
        </div>
      ) : (
        <>
          <label className="grid gap-1 text-sm font-semibold text-dark dark:text-white">
            Platform
            <select
              name="platform"
              required
              defaultValue={social?.platform ?? socialPlatforms[0].value}
              className="rounded-xl border border-graymid/60 bg-white px-3 py-2 text-base text-dark focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              {socialPlatforms.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <TextField name="url" label="URL" required defaultValue={social?.url ?? ""} />
          <div className="flex justify-end gap-3">
            {social ? (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-gray-500 transition hover:-translate-y-0.5 dark:text-gray-200"
              >
                Cancel
              </button>
            ) : null}
            <button type="submit" disabled={isPending} className={`${actionButtonClass} disabled:opacity-60`}>
              {isPending ? "Saving..." : social ? "Save" : "Add Link"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
