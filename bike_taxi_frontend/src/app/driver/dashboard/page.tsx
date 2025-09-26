"use client";

import React, { useCallback, useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { apiFetch, type ApiError } from "@/lib/api";

interface Driver {
  id: string;
  user_id: string;
  vehicle_number: string;
  license_id: string;
  is_active: boolean;
  rating: number;
  total_rides: number;
  created_at: string;
}

export default function DriverDashboardPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState({
    vehicle_number: "",
    license_id: "",
  });
  const [saving, setSaving] = useState(false);

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await apiFetch<Driver[]>("/drivers", { method: "GET" });
      setDrivers(data);
    } catch (e: unknown) {
      const message =
        (e as ApiError)?.message || (e as Error)?.message || "Failed to load drivers";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  async function onSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      await apiFetch<Driver>("/drivers", {
        method: "POST",
        body: form,
      });
      await fetchDrivers();
      setForm({ vehicle_number: "", license_id: "" });
    } catch (e: unknown) {
      const message =
        (e as ApiError)?.message || (e as Error)?.message || "Failed to save profile";
      setErr(message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleAvailability(driverId: string) {
    try {
      await apiFetch<Driver>(`/drivers/${driverId}/toggle`, { method: "POST" });
      await fetchDrivers();
    } catch (e: unknown) {
      const message =
        (e as ApiError)?.message ||
        (e as Error)?.message ||
        "Failed to toggle availability";
      setErr(message);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h1 className="text-xl font-semibold mb-4">Driver Dashboard</h1>
        <p className="text-sm text-gray-600 mb-4">
          Create or update your driver profile, and toggle your availability.
        </p>
        <form onSubmit={onSaveProfile} className="grid grid-cols-2 gap-4">
          <Input
            label="Vehicle Number"
            name="vehicle_number"
            placeholder="KA-01-AB-1234"
            value={form.vehicle_number}
            onChange={(e) =>
              setForm((s) => ({ ...s, vehicle_number: e.target.value }))
            }
            required
          />
          <Input
            label="License ID"
            name="license_id"
            placeholder="DL-XXXX-YYYY"
            value={form.license_id}
            onChange={(e) =>
              setForm((s) => ({ ...s, license_id: e.target.value }))
            }
            required
          />
          <div className="col-span-2">
            {err && (
              <div
                className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-2"
                role="alert"
              >
                {err}
              </div>
            )}
            <Button type="submit" disabled={saving} aria-busy={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2">Active Drivers</h2>
        {loading ? (
          <p className="text-sm text-gray-600">Loading...</p>
        ) : (
          <ul className="divide-y">
            {drivers.map((d) => (
              <li key={d.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {d.vehicle_number}{" "}
                    <span className="text-xs text-gray-500">({d.license_id})</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    Rating: {d.rating?.toFixed(1) ?? "—"} • Total rides:{" "}
                    {d.total_rides}
                  </p>
                  <p className="text-xs">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        d.is_active ? "text-emerald-600" : "text-gray-500"
                      }`}
                    >
                      {d.is_active ? "Available" : "Inactive"}
                    </span>
                  </p>
                </div>
                <Button
                  variant={d.is_active ? "danger" : "secondary"}
                  onClick={() => toggleAvailability(d.id)}
                >
                  {d.is_active ? "Go Offline" : "Go Online"}
                </Button>
              </li>
            ))}
            {drivers.length === 0 && (
              <li className="py-6 text-center text-gray-500 text-sm">
                No drivers yet.
              </li>
            )}
          </ul>
        )}
      </Card>
    </div>
  );
}
