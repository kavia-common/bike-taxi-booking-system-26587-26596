"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/lib/store";
import type { ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const token = await loginUser(form);
      setAuth({ isAuthenticated: true, token: token.access_token });
      router.push("/rides/book");
    } catch (error: unknown) {
      const message =
        (error as ApiError)?.message ||
        (error as Error)?.message ||
        "Login failed";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
        {err && (
          <div
            className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
            role="alert"
          >
            {err}
          </div>
        )}
        <Button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Card>
  );
}
