"use client";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";

export default function HeroAdminPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    headline: "",
    subheadline: "",
    description: "",
    profileImage: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  async function loadHero() {
    const res = await fetch("/api/hero");
    const data = await res.json();

    if (data.hero) {
      setForm({
        name: data.hero.name || "",
        headline: data.hero.headline || "",
        subheadline: data.hero.subheadline || "",
        description: data.hero.description || "",
        profileImage: data.hero.profileImage || "",
        resumeUrl: data.hero.resumeUrl || "",
        githubUrl: data.hero.githubUrl || "",
        linkedinUrl: data.hero.linkedinUrl || "",
      });
    }
  }

  useEffect(() => {
    loadHero();
  }, []);

  async function uploadImage(file: File) {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("files", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const imageUrl = data.images?.[0] || "";

      setForm((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    } finally {
      setUploading(false);
    }
  }

  async function saveHero(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await fetch("/api/hero", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      alert("Hero updated successfully");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout title="Hero Section">
      <div className="mx-auto max-w-5xl">
        <AdminCard>
          <div className="mb-8">
            <p className="text-cyan-300">
              Homepage Content
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Hero Section
            </h2>
          </div>

          <form
            onSubmit={saveHero}
            className="space-y-5"
          >
            <input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <input
              placeholder="Headline"
              value={form.headline}
              onChange={(e) =>
                setForm({
                  ...form,
                  headline: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <input
              placeholder="Subheadline"
              value={form.subheadline}
              onChange={(e) =>
                setForm({
                  ...form,
                  subheadline: e.target.value,
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
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];

                  if (file) {
                    uploadImage(file);
                  }
                }}
                className="block w-full rounded-xl border border-white/10 bg-white/5 p-4"
              />

              {uploading && (
                <p className="mt-3 text-cyan-300">
                  Uploading...
                </p>
              )}

              {form.profileImage && (
                <img
                  src={form.profileImage}
                  alt="Profile"
                  className="mt-4 h-40 w-40 rounded-2xl object-cover border border-white/10"
                />
              )}
            </div>

            <input
              placeholder="Resume URL"
              value={form.resumeUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  resumeUrl: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <input
              placeholder="GitHub URL"
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
              placeholder="LinkedIn URL"
              value={form.linkedinUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  linkedinUrl: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <AdminButton>
              {loading
                ? "Saving..."
                : "Save Hero Section"}
            </AdminButton>
          </form>
        </AdminCard>
      </div>
    </AdminLayout>
  );
}