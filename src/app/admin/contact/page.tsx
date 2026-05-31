"use client";

import { useEffect, useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";

export default function ContactAdminPage() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    location: "",
  });

  async function fetchContact() {
    const res = await fetch("/api/contact");

    const data = await res.json();

    if (data) {
      setForm({
        email: data.email || "",
        phone: data.phone || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        location: data.location || "",
      });
    }
  }

  useEffect(() => {
    fetchContact();
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Contact Updated");
  }

  return (
    <AdminLayout title="Contact">
      <AdminCard>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />

          <input
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={(e) =>
              setForm({
                ...form,
                linkedin:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />

          <input
            placeholder="GitHub URL"
            value={form.github}
            onChange={(e) =>
              setForm({
                ...form,
                github:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />

          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location:
                  e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4"
          />

          <AdminButton type="submit">
            Save Contact
          </AdminButton>
        </form>
      </AdminCard>
    </AdminLayout>
  );
}