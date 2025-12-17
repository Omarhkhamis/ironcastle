"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { deleteProject, saveProject } from "../../app/dashboard/actions";
import { useToast } from "./ToastProvider";
import { iconButtonClass } from "./ui";
import UploadButton from "./UploadButton";
import MediaPickerButton from "./MediaPickerButton";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

type Project = {
  id: number;
  title: string;
  slug: string;
  categoryLabel: string | null;
  mainImage: string;
  location?: string | null;
  categories?: string[];
  overview?: string | null;
  description?: string | null;
  gallery?: string[];
};

type Props = {
  projects: Project[];
};

const categoryOptions = [
  { label: "Aluminum", value: "Aluminum" },
  { label: "Steel", value: "Steel" },
  { label: "Glass", value: "Glass" }
];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

export default function ProjectsManager({ projects }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isSubmitting, startTransition] = useTransition();
  const [titleInput, setTitleInput] = useState("");
  const [slugValue, setSlugValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([categoryOptions[0].value]);
  const { showToast } = useToast();
  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLTextAreaElement>(null);

  const sorted = useMemo(
    () =>
      [...projects].sort((a, b) => {
        const aDate = a.id ?? 0;
        const bDate = b.id ?? 0;
        return bDate - aDate;
      }),
    [projects]
  );

  const initializeForm = (project?: Project | null) => {
    const currentTitle = project?.title ?? "";
    setTitleInput(currentTitle);
    const baseSlug = project?.slug ?? (currentTitle ? slugify(currentTitle) : "");
    setSlugValue(baseSlug);
    const categoriesFromProject = project?.categories?.length
      ? project.categories
      : project?.categoryLabel
        ? [project.categoryLabel]
        : [categoryOptions[0].value];
    setSelectedCategories(categoriesFromProject);
  };

  const openModal = (project?: Project) => {
    initializeForm(project ?? null);
    setEditing(project ?? null);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setEditing(null);
    setModalOpen(false);
  };

  const formAction = (formData: FormData, message: string) => {
    startTransition(async () => {
      await saveProject(formData);
      closeModal();
      showToast(message);
    });
  };

  useEffect(() => {
    if (!modalOpen) return;
    if (mainImageRef.current) {
      mainImageRef.current.value = editing?.mainImage ?? "";
    }
    if (galleryRef.current) {
      galleryRef.current.value = editing?.gallery?.join("\n") ?? "";
    }
  }, [editing, modalOpen]);

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(value)) {
        const filtered = prev.filter((item) => item !== value);
        return filtered.length ? filtered : [value];
      }
      return [...prev, value];
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.4em] text-accent">Projects</p>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded-xl border border-accent px-4 py-2 text-sm font-medium text-accent transition hover:-translate-y-0.5"
        >
          Add Project
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-graymid/70 bg-white/80 p-6 text-center text-gray-500 dark:border-white/20 dark:bg-white/5 dark:text-gray-300">
          No projects yet. Click “Add Project” to publish headline work.
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-3 rounded-2xl border border-graymid/70 bg-white/90 px-4 py-4 dark:border-white/10 dark:bg-[#10141d] md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="hidden h-16 w-24 overflow-hidden rounded-xl border border-graymid/70 md:block">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-dark dark:text-white">{project.title}</p>
                    <span className="rounded-full border border-graymid/60 px-2 py-0.5 text-xs text-gray-500 dark:border-white/20 dark:text-gray-300">
                      {project.slug}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {project.categoryLabel || "Uncategorized"} · {project.location || "Location TBD"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => openModal(project)}
                  className={iconButtonClass}
                  aria-label="Edit project"
                >
                  <i className="fas fa-pen" aria-hidden />
                </button>
                <form
                  action={async (formData) => {
                    await deleteProject(formData);
                    showToast("Project deleted");
                  }}
                  className="flex"
                >
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="slug" value={project.slug} />
                  <ConfirmDeleteButton
                    type="submit"
                    message={`Are you sure you want to delete "${project.title}"?`}
                    className={`${iconButtonClass} border-red-400 text-red-500 hover:border-red-500 hover:text-red-500 dark:border-red-500/40`}
                    aria-label="Delete project"
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
          <div className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#070a10] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full border border-red-500/40 px-3 py-1 text-xs text-red-400 transition hover:border-red-500 hover:text-red-300"
              aria-label="Close"
            >
              <i className="fas fa-times" aria-hidden />
            </button>
            <h3 className="mb-4 text-2xl font-semibold">
              {editing ? `Edit: ${editing.title}` : "Add Project"}
            </h3>
            <form
              action={(formData) => formAction(formData, editing ? "Project updated!" : "Project created!")}
              className="grid gap-3"
            >
              <input type="hidden" name="id" defaultValue={editing?.id ?? ""} />
              <input type="hidden" name="previousSlug" value={editing?.slug ?? ""} />
              <input type="hidden" name="slug" value={slugValue} />
              <input type="hidden" name="categoryLabel" value={selectedCategories[0]} />
              <input type="hidden" name="categories" value={selectedCategories.join(", ")} />
              <label className="grid gap-1 text-sm font-medium">
                Title
                <input
                  name="title"
                  required
                  value={titleInput}
                  onChange={(event) => {
                    const value = event.target.value;
                    setTitleInput(value);
                    setSlugValue(slugify(value));
                  }}
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <div className="space-y-2">
                <p className="text-sm font-medium text-white">Categories</p>
                <div className="flex flex-wrap gap-3">
                  {categoryOptions.map((option) => {
                    const checked = selectedCategories.includes(option.value);
                    return (
                      <button
                        type="button"
                        key={option.value}
                        onClick={() => toggleCategory(option.value)}
                        className={`rounded-full border px-4 py-1 text-sm ${
                          checked
                            ? "border-accent bg-accent/20 text-white"
                            : "border-white/20 bg-white/5 text-white/70"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <label className="grid gap-1 text-sm font-medium">
                Location
                <input
                  name="location"
                  defaultValue={editing?.location ?? ""}
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Overview
                <textarea
                  name="overview"
                  rows={3}
                  defaultValue={editing?.overview ?? ""}
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Description
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={editing?.description ?? ""}
                  className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Main image URL
                <div className="flex items-center gap-2">
                  <input
                    ref={mainImageRef}
                    name="mainImage"
                    required
                    defaultValue={editing?.mainImage ?? ""}
                    className="flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  <UploadButton
                    target="project"
                    slug={slugValue}
                    onUploaded={(url) => {
                      if (mainImageRef.current) {
                        mainImageRef.current.value = url;
                      }
                    }}
                  />
                  <MediaPickerButton
                    onSelect={(url) => {
                      if (mainImageRef.current) {
                        mainImageRef.current.value = url;
                      }
                    }}
                  />
                </div>
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Gallery URLs (one per line)
                <div className="flex items-start gap-2">
                  <textarea
                    ref={galleryRef}
                    name="gallery"
                    rows={4}
                    defaultValue={editing?.gallery?.join("\n") ?? ""}
                    className="flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  <UploadButton
                    target="project"
                    slug={slugValue}
                    onUploaded={(url) => {
                      if (galleryRef.current) {
                        const trimmed = galleryRef.current.value.trim();
                        galleryRef.current.value = trimmed ? `${trimmed}\n${url}` : url;
                      }
                    }}
                  />
                  <MediaPickerButton
                    onSelect={(url) => {
                      if (galleryRef.current) {
                        const trimmed = galleryRef.current.value.trim();
                        galleryRef.current.value = trimmed ? `${trimmed}\n${url}` : url;
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
                  {isSubmitting ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
