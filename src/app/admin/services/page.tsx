"use client";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import * as Icons from "lucide-react";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<any[]>([]);
  const [iconSearch, setIconSearch] =
    useState("");

  const filteredIcons = Object.keys(Icons)
    .filter(
      (name) =>
        name
          .toLowerCase()
          .includes(iconSearch.toLowerCase())
    )
    .slice(0, 50);

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    featured: false,
  });

  async function fetchServices() {
    const res = await fetch("/api/services");
    const data = await res.json();

    setServices(data);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      title: "",
      description: "",
      icon: "",
      featured: false,
    });

    fetchServices();
  }

  async function deleteService(id: string) {
    await fetch("/api/services", {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    fetchServices();
  }
  async function toggleFeatured(
    id: string,
    featured: boolean
  ) {
    await fetch("/api/services", {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id,
        featured: !featured,
      }),
    });

    fetchServices();
  }

  return (
    <AdminLayout title="Services">
      <AdminCard>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            placeholder="Service Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
          />
          <div className="space-y-3">
            <input
              placeholder="Search Icon..."
              onChange={(e) =>
                setIconSearch(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none"
            />

            <div className="grid grid-cols-4 gap-3 rounded-xl border border-white/10 bg-white/5 p-4 md:grid-cols-6">
              {filteredIcons.map((name) => {
                const Icon =
                  Icons[name as keyof typeof Icons] as React.ElementType;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        icon: name,
                      })
                    }
                    className={`flex flex-col items-center gap-2 rounded-xl p-3 transition ${
                      form.icon === name
                        ? "border border-cyan-400 bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.25)] scale-105"
                        : "border border-white/10 hover:border-cyan-400/30"
                    }`}
                  >
                    <Icon size={22} />

                    <span className="text-xs">
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>

            {form.icon && (
              <div className="flex items-center gap-3 rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4">
                {(() => {
                  const SelectedIcon =
                    (Icons[
                      form.icon as keyof typeof Icons
                    ] as React.ElementType) || Icons.Code2;

                  return <SelectedIcon size={24} />;
                })()}

                <span className="font-medium">
                  {form.icon}
                </span>
              </div>
            )}
          </div>

          <AdminButton type="submit">
            Add Service
          </AdminButton>
        </form>
      </AdminCard>

      <div className="mt-8 grid gap-4">
        {services.map((service) => (
          <AdminCard key={service.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 text-white/60">
                  {service.description}
                </p>

                <p className="mt-2 text-cyan-300">
                  {service.icon}
                </p>
                <p
                  className={`mt-2 font-medium ${
                    service.featured
                      ? "text-green-400"
                      : "text-white/40"
                  }`}
                >
                  {service.featured
                    ? "Featured On Homepage"
                    : "Hidden From Homepage"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    toggleFeatured(
                      service.id,
                      service.featured
                    )
                  }
                  className={`rounded-xl px-4 py-2 transition ${
                    service.featured
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                >
                  {service.featured
                    ? "Featured"
                    : "Show"}
                </button>

                <button
                  onClick={() =>
                    deleteService(service.id)
                  }
                  className="rounded-xl bg-red-500 px-4 py-2 transition hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </AdminLayout>
  );
}