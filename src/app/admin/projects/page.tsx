"use client";
import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [preview, setPreview] = useState<string[]>([]);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    imageUrls: [] as string[],
    liveUrl: "",
    githubUrl: "",
    technologies: "",
    featured: false,
  });

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();

    setProjects(data.projects || []);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function uploadImages(files: FileList) {
    try {
      setUploading(true);

      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const urls = data.images || [];

      setPreview((prev) => [...prev, ...urls]);

      setForm((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    setPreview((prev) => prev.filter((_, i) => i !== index));

    setForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: form.title,
        slug: form.slug,
        description: form.description,

        imageUrls: form.imageUrls,

        liveUrl: form.liveUrl,
        githubUrl: form.githubUrl,

        technologies: form.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),

        featured: form.featured,
       }),
    });

    setForm({
      title: "",
      slug: "",
      description: "",
      imageUrls: [],
      liveUrl: "",
      githubUrl: "",
      technologies: "",
      featured: false,
    });

    setPreview([]);

    await fetchProjects();

    setLoading(false);
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;

    await fetch("/api/projects", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id,
      }),
    });

    fetchProjects();
  }

  return (
    <AdminLayout title="Projects">
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <AdminCard>
          <div className="mb-8">
            <p className="text-cyan-300">
              Portfolio Content
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Project Management
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              placeholder="Project Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <textarea
              rows={6}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <div>
              <label className="mb-3 block text-white/60">
                Project Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    uploadImages(e.target.files);
                    e.target.value = "";
                  }
                }}
                className="block w-full rounded-xl border border-white/10 bg-white/5 p-4"
              />

              {uploading && (
                <p className="mt-3 text-cyan-300">
                  Uploading...
                </p>
              )}

              <div className="mt-5 grid grid-cols-2 gap-4">
                {preview
                  .filter((img) => typeof img === "string" && img.length >0)
                  .map((img, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    {img && (
                      <img
                        src={img}
                        alt="Preview"
                        className="rounded-2xl border border-white/10"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <input
              placeholder="Live URL"
              value={form.liveUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  liveUrl: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <input
              placeholder="Github URL"
              value={form.githubUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  githubUrl: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <input
              placeholder="Next.js, Prisma, Tailwind"
              value={form.technologies}
              onChange={(e) =>
                setForm({
                  ...form,
                  technologies: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({
                    ...form,
                    featured: e.target.checked,
                  })
                }
              />

              Featured Project
            </label>

            <AdminButton>
              {loading
                ? "Saving..."
                : "Create Project"}
            </AdminButton>
          </form>
        </AdminCard>

        <AdminCard>
          <h3 className="text-xl font-semibold">
            Dashboard
          </h3>

          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-white/50">
                Total Projects
              </p>

              <h2 className="text-4xl font-bold">
                {projects.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-white/50">
                Featured Projects
              </p>

              <h2 className="text-4xl font-bold">
                {
                  projects.filter(
                    (p) => p.featured
                  ).length
                }
              </h2>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  {project.imageUrls?.[0] && (
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      className="h-32 w-full cursor-pointer rounded-xl object-cover"
                      onClick={() => {
                        setSelectedImages(
                          project.imageUrls.filter(
                            (img: string) => img && img.length > 0
                          )
                        );
                        setCurrentImage(0);
                      }}
                    />
                  )}

                  <h4 className="mt-3 font-semibold">
                    {project.title}
                  </h4>

                  {project.featured && (
                    <span className="mt-2 inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                      Featured
                    </span>
                  )}

                  <button
                    onClick={() =>
                      deleteProject(project.id)
                    }
                    className="mt-3 rounded-xl bg-red-500 px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>
      </div>

      {Array.isArray(selectedImages) &&
        selectedImages.length > 0 &&
        selectedImages[currentImage] && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="max-w-6xl">
            {selectedImages[currentImage] && (
              <img
                src={selectedImages[currentImage]}
                alt="Project Preview"
                className="max-h-[80vh] w-auto rounded-3xl"
              />
            )}

            <div className="mt-5 flex justify-center gap-4">
              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === 0
                      ? selectedImages.length - 1
                      : prev - 1
                  )
                }
                className="rounded-xl bg-white/10 px-5 py-2"
              >
                Prev
              </button>

              <button
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev ===
                    selectedImages.length - 1
                      ? 0
                      : prev + 1
                  )
                }
                className="rounded-xl bg-white/10 px-5 py-2"
              >
                Next
              </button>

              <button
                onClick={() =>
                  setSelectedImages([])
                }
                className="rounded-xl bg-red-500 px-5 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}