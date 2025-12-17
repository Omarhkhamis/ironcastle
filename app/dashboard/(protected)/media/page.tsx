import {
  cardClass,
  iconButtonClass,
  SectionHeading
} from "../../../../components/dashboard/ui";
import { deleteMediaFile } from "../../actions";
import ConfirmDeleteButton from "../../../../components/dashboard/ConfirmDeleteButton";
import { listMediaFiles, type MediaFile } from "../../../../lib/media";

export default async function MediaPage() {
  const mediaFiles = await listMediaFiles().catch(() => []);
  if (mediaFiles.length === 0) {
    return (
      <section className="space-y-6">
        <SectionHeading title="Media Library" description="Manage uploaded assets." />
        <div className={`${cardClass} text-center text-sm text-gray-500 dark:text-gray-300`}>
          No images have been uploaded yet. Use upload controls inside Services, Projects, or
          Settings to add assets.
        </div>
      </section>
    );
  }

  const grouped = mediaFiles.reduce<Record<string, MediaFile[]>>((acc, file) => {
    const key = file.folderLabel;
    acc[key] = acc[key] || [];
    acc[key].push(file);
    return acc;
  }, {});

  const groups = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <section className="space-y-6">
      <SectionHeading title="Media Library" description="Review and delete uploaded images." />
      {groups.map(([folder, files]) => (
        <div key={folder} className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">
            {folder === "root" ? "General uploads" : folder}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {files.map((file) => (
              <div key={file.relativePath} className={`${cardClass} space-y-3`}>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#05070d]">
                  <img
                    src={file.url}
                    alt={file.relativePath}
                    className="h-48 w-full object-contain"
                  />
                </div>
                <div className="text-sm font-semibold text-dark dark:text-white">
                  {file.relativePath}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">{file.sizeKB} KB</div>
                <div className="flex justify-end">
                  <form action={deleteMediaFile}>
                    <input type="hidden" name="path" value={file.relativePath} />
                    <ConfirmDeleteButton
                      type="submit"
                      message={`Are you sure you want to delete ${file.relativePath}?`}
                      className={`${iconButtonClass} border-red-400 text-red-500 hover:border-red-500 hover:text-red-500 dark:border-red-500/40`}
                      aria-label="Delete media"
                    >
                      <i className="fas fa-times" aria-hidden />
                    </ConfirmDeleteButton>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
