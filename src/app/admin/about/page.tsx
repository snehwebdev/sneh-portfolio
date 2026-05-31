"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";

export default function AboutAdminPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  useEffect(() => {
    fetch("/api/about")
      .then(async (res) => {
        if (!res.ok) return null;

        const text = await res.text();

        if (!text) return null;

        return JSON.parse(text);
      })
      .then((data) => {
        if (!data) return;

        setForm({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
        });
      });
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    await fetch("/api/about", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);
  }

  return (
    <AdminLayout title="About Section">
      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <AdminCard>
          <div className="mb-8">
            <p className="text-cyan-300">
              Portfolio Content
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              About Information
            </h2>

            <p className="mt-3 text-white/60">
              Manage everything shown in your About section.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input
              placeholder="Title"
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
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={(e) =>
                setForm({
                  ...form,
                  subtitle: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4"
            />

            <textarea
              rows={10}
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

            <AdminButton
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save About Section"}
            </AdminButton>
          </form>
        </AdminCard>

        <AdminCard>
          <h3 className="mb-6 text-xl font-semibold">
            Live Preview
          </h3>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-cyan-300">
              About Me
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {form.title ||
                "Your title appears here"}
            </h2>

            <p className="mt-3 text-purple-300">
              {form.subtitle ||
                "Your subtitle appears here"}
            </p>

            <p className="mt-5 whitespace-pre-wrap text-white/60">
              {form.description ||
                "Your description preview appears here."}
            </p>
          </div>
        </AdminCard>
      </div>
    </AdminLayout>
  );
}