"use client";

import { useEffect, useState } from "react";
import { iconButtonClass } from "./ui";
import { useToast } from "./ToastProvider";

type MediaFile = {
  relativePath: string;
  folderLabel: string;
  url: string;
  sizeKB: number;
};

type Props = {
  onSelect: (url: string) => void;
};

export default function MediaPickerButton({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (!open || files.length) return;
    const load = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/media/list");
        if (!response.ok) throw new Error("Unable to load media");
        const data = await response.json();
        setFiles(data.files || []);
      } catch (error: any) {
        showToast(error?.message || "Failed to load media files");
        setOpen(false);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [open, files.length, showToast]);

  const handleSelect = (file: MediaFile) => {
    onSelect(file.url);
    showToast("Image selected");
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${iconButtonClass} !text-accent`}
        aria-label="Select from media gallery"
      >
        <i className="fas fa-images" aria-hidden />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#05070d] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.4em] text-gray-300"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <h3 className="mb-4 text-2xl font-semibold">Choose Image</h3>
            {loading ? (
              <div className="py-10 text-center text-sm text-gray-300">Loading media...</div>
            ) : files.length === 0 ? (
              <div className="py-10 text-center text-sm text-gray-300">
                No images found. Upload assets first.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {files.map((file) => (
                  <button
                    type="button"
                    key={file.relativePath}
                    className="rounded-2xl border border-white/10 bg-white/5 text-left transition hover:-translate-y-1 hover:border-accent"
                    onClick={() => handleSelect(file)}
                  >
                    <div className="h-40 overflow-hidden rounded-t-2xl bg-black/20">
                      <img
                        src={file.url}
                        alt={file.relativePath}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="px-3 py-2 text-xs text-gray-300">
                      <p className="truncate font-semibold">{file.relativePath}</p>
                      <p>{file.sizeKB} KB</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
