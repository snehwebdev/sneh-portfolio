"use client";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";

export default function TechnologiesAdminPage() {
  const [technologies, setTechnologies] =
    useState<any[]>([]);

  const [form, setForm] = useState({
    category: "",
    name: "",
    logoUrl: "",
  });

  async function fetchTechnologies() {
    const res = await fetch(
      "/api/technologies"
    );

    const data = await res.json();

    setTechnologies(data);
  }

  useEffect(() => {
    fetchTechnologies();
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch("/api/technologies", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      category: "",
      name: "",
      logoUrl: "",
    });

    fetchTechnologies();
  }

  async function deleteTechnology(
    id: string
  ) {
    await fetch("/api/technologies", {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    fetchTechnologies();
  }

  return (
    <AdminLayout title="Technologies">
      <AdminCard>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />

          <input
            placeholder="Technology Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />

          <input
            placeholder="Logo URL"
            value={form.logoUrl}
            onChange={(e) =>
              setForm({
                ...form,
                logoUrl:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />

          <AdminButton type="submit">
            Add Technology
          </AdminButton>
        </form>
      </AdminCard>

      <div className="mt-8 grid gap-4">
        {technologies.map((tech) => (
          <AdminCard key={tech.id}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">
                  {tech.name}
                </h3>

                <p className="text-white/50">
                  {tech.category}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteTechnology(
                    tech.id
                  )
                }
                className="rounded-xl bg-red-500 px-4 py-2"
              >
                Delete
              </button>
            </div>
          </AdminCard>
        ))}
      </div>
    </AdminLayout>
  );
}