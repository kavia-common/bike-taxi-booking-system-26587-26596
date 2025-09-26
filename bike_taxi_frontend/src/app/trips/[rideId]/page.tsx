"use client";

import React, { useCallback, useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { apiFetch, type ApiError } from "@/lib/api";
import { useParams } from "next/navigation";

interface TripUpdateOut {
  id: string;
  ride_id: string;
  lat: number;
  lng: number;
  speed_kmh?: number | null;
  note?: string | null;
  timestamp: string;
}

export default function TripStatusPage() {
  const params = useParams<{ rideId: string }>();
  const rideId = params.rideId;
  const [updates, setUpdates] = useState<TripUpdateOut[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUpdates = useCallback(async () => {
    if (!rideId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<TripUpdateOut[]>(
        `/trips/${rideId}/updates`,
        {}
      );
      setUpdates(res);
    } catch (e: unknown) {
      const message =
        (e as ApiError)?.message ||
        (e as Error)?.message ||
        "Failed to load trip updates";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [rideId]);

  useEffect(() => {
    if (rideId) {
      fetchUpdates();
      const id = setInterval(fetchUpdates, 5000);
      return () => clearInterval(id);
    }
  }, [rideId, fetchUpdates]);

  const last = updates[updates.length - 1];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h1 className="text-xl font-semibold mb-4">Trip Status</h1>
        {loading && <p className="text-sm text-gray-600">Loading...</p>}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {!loading && !error && (
          <ul className="space-y-2">
            {updates.map((u) => (
              <li
                key={u.id}
                className="rounded-lg border p-3 text-sm flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">
                    {u.lat.toFixed(4)}, {u.lng.toFixed(4)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(u.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-xs text-gray-600">
                  {u.speed_kmh != null ? `${u.speed_kmh} km/h` : ""}
                </div>
              </li>
            ))}
            {updates.length === 0 && (
              <li className="text-center text-gray-500 text-sm py-6">
                No updates yet.
              </li>
            )}
          </ul>
        )}
      </Card>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2">Live Map</h2>
        <div
          className="h-64 rounded-lg bg-gradient-to-br from-blue-100 to-gray-50 border flex items-center justify-center text-gray-500"
          role="img"
          aria-label="Map placeholder"
        >
          {last ? (
            <span>
              Latest: {last.lat.toFixed(4)}, {last.lng.toFixed(4)}
            </span>
          ) : (
            "Waiting for location..."
          )}
        </div>
      </Card>
    </div>
  );
}
