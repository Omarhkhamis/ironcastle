"use client";

import { useRef, useTransition } from "react";
import { saveSeoSettings } from "../../app/dashboard/actions";
import { useToast } from "./ToastProvider";
import UploadButton from "./UploadButton";
import MediaPickerButton from "./MediaPickerButton";
import { actionButtonClass, TextAreaField, TextField } from "./ui";

type SettingData = {
  id?: number | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  seoImageUrl?: string | null;
  seoJsonLd?: string | null;
};

export default function SEOForm({ setting }: { setting: SettingData | null | undefined }) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await saveSeoSettings(formData);
      showToast("SEO settings saved");
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" defaultValue={setting?.id ?? ""} />
      <TextField
        name="seoTitle"
        label="Meta title"
        defaultValue={setting?.seoTitle ?? ""}
        placeholder="Iron Castle UAE | Industrial Metal Fabrication"
      />
      <TextAreaField
        name="seoDescription"
        label="Meta description"
        rows={4}
        defaultValue={setting?.seoDescription ?? ""}
        placeholder="Describe Iron Castle UAE's core metal fabrication and installation services."
      />
      <TextAreaField
        name="seoKeywords"
        label="Keywords (comma separated)"
        rows={3}
        defaultValue={setting?.seoKeywords ?? ""}
        placeholder="steel fabrication UAE, aluminum fabrication Sharjah, Iron Castle UAE"
      />
      <label className="grid gap-1 text-sm font-semibold text-dark dark:text-white">
        Open Graph image URL
        <div className="flex gap-2">
          <input
            ref={imageRef}
            name="seoImageUrl"
            defaultValue={setting?.seoImageUrl ?? ""}
            className="flex-1 rounded-xl border border-graymid/60 bg-white px-3 py-2 text-base font-normal text-dark focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/20 dark:bg-white/5 dark:text-white"
          />
          <UploadButton
            target="general"
            onUploaded={(url) => {
              if (imageRef.current) {
                imageRef.current.value = url;
              }
            }}
          />
          <MediaPickerButton
            onSelect={(url) => {
              if (imageRef.current) {
                imageRef.current.value = url;
              }
            }}
          />
        </div>
      </label>
      <TextAreaField
        name="seoJsonLd"
        label="Structured data (JSON-LD)"
        rows={6}
        defaultValue={setting?.seoJsonLd ?? ""}
        placeholder={`{
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "Iron Castle UAE"
}`}
      />
      <div className="flex justify-end">
        <button type="submit" disabled={isPending} className={`${actionButtonClass} disabled:opacity-60`}>
          {isPending ? "Saving..." : "Save SEO Settings"}
        </button>
      </div>
    </form>
  );
}
