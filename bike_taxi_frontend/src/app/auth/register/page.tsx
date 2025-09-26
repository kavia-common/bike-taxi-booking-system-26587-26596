"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { registerUser, loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/lib/store";
import type { ApiError } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    role: "passenger" as "passenger" | "driver",
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await registerUser(form);
      const token = await loginUser({
        email: form.email,
        password: form.password,
      });
      setAuth({ isAuthenticated: true, token: token.access_token });
      router.push(form.role === "driver" ? "/driver/dashboard" : "/rides/book");
    } catch (error: unknown) {
      const message =
        (error as ApiError)?.message ||
        (error as Error)?.message ||
        "Registration failed";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Create your account</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          name="name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) =>
            setForm((s) => ({ ...s, password: e.target.value }))
          }
          required
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Role</label>
          <select
            className="rounded-lg border px-3 py-2 text-sm bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.role}
            onChange={(e) =>
              setForm((s) => ({ ...s, role: e.target.value as "passenger" | "driver" }))
            }
          >
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        {err && (
          <div
            className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
            role="alert"
          >
            {err}
          </div>
        )}
        <Button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Creating..." : "Create account"}
        </Button>
      </form>
    </Card>
  );
}
