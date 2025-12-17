"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";
import { iconButtonClass } from "./ui";

type Props = {
  target: "general" | "partner" | "project";
  slug?: string | null;
  onUploaded: (url: string) => void;
  disabled?: boolean;
};

export default function UploadButton({ target, slug, onUploaded, disabled }: Props) {
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("target", target);
      if (target === "project" && slug) {
        data.append("slug", slug);
      }
      const response = await fetch("/api/upload", { method: "POST", body: data });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Upload failed");
      }
      const result = await response.json();
      onUploaded(result.url);
      showToast("Image uploaded");
    } catch (error: any) {
      showToast(error?.message || "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const isDisabled = disabled || uploading || (target === "project" && !slug);

  return (
    <label className={`${iconButtonClass} ${isDisabled ? "opacity-50" : ""}`}>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={isDisabled}
      />
      {uploading ? <i className="fas fa-spinner fa-spin" aria-hidden /> : <i className="fas fa-upload" aria-hidden />}
    </label>
  );
}
