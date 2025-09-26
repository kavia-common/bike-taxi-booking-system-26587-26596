"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { apiFetch, type ApiError } from "@/lib/api";

interface RideOut {
  id: string;
  status: string;
  created_at: string;
  fare_final?: number | null;
  fare_estimate?: number | null;
  driver_id?: string | null;
}

export default function RideHistoryPage() {
  const [rides, setRides] = useState<RideOut[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch<RideOut[]>("/rides", { method: "GET" });
        setRides(res);
      } catch (err: unknown) {
        const message =
          (err as ApiError)?.message ||
          (err as Error)?.message ||
          "Failed to fetch rides";
        setError(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card className="p-6">
      <h1 className="text-xl font-semibold mb-4">Your Rides</h1>
      {loading && <p className="text-sm text-gray-600">Loading...</p>}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && (
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left bg-gray-50">
              <tr>
                <th className="px-3 py-2 font-medium text-gray-700">Ride ID</th>
                <th className="px-3 py-2 font-medium text-gray-700">Status</th>
                <th className="px-3 py-2 font-medium text-gray-700">
                  Estimate
                </th>
                <th className="px-3 py-2 font-medium text-gray-700">Final</th>
                <th className="px-3 py-2 font-medium text-gray-700">
                  Driver
                </th>
                <th className="px-3 py-2 font-medium text-gray-700">Created</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((r) => (
                <tr
                  key={r.id}
                  className="border-b last:border-0 hover:bg-blue-50/40"
                >
                  <td className="px-3 py-2 font-mono">{r.id}</td>
                  <td className="px-3 py-2">{r.status}</td>
                  <td className="px-3 py-2">
                    {r.fare_estimate != null ? `₹${r.fare_estimate}` : "—"}
                  </td>
                  <td className="px-3 py-2">
                    {r.fare_final != null ? `₹${r.fare_final}` : "—"}
                  </td>
                  <td className="px-3 py-2">{r.driver_id || "—"}</td>
                  <td className="px-3 py-2">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {rides.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                    No rides found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
