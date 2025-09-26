"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { apiFetch, type ApiError } from "@/lib/api";

interface RideOut {
  id: string;
  status: string;
  fare_estimate?: number | null;
  pickup_lat: number;
  pickup_lng: number;
  dropoff_lat: number;
  dropoff_lng: number;
}

export default function BookRidePage() {
  const [form, setForm] = useState({
    pickup_lat: "",
    pickup_lng: "",
    dropoff_lat: "",
    dropoff_lng: "",
  });
  const [loading, setLoading] = useState(false);
  const [ride, setRide] = useState<RideOut | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        pickup_lat: parseFloat(form.pickup_lat),
        pickup_lng: parseFloat(form.pickup_lng),
        dropoff_lat: parseFloat(form.dropoff_lat),
        dropoff_lng: parseFloat(form.dropoff_lng),
      };
      const res = await apiFetch<RideOut>("/rides", {
        method: "POST",
        body: payload,
      });
      setRide(res);
    } catch (err: unknown) {
      const message =
        (err as ApiError)?.message ||
        (err as Error)?.message ||
        "Failed to book ride";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h1 className="text-xl font-semibold mb-4">Book a Ride</h1>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <Input
            label="Pickup Lat"
            name="pickup_lat"
            type="number"
            step="any"
            placeholder="12.9716"
            value={form.pickup_lat}
            onChange={(e) =>
              setForm((s) => ({ ...s, pickup_lat: e.target.value }))
            }
            required
          />
          <Input
            label="Pickup Lng"
            name="pickup_lng"
            type="number"
            step="any"
            placeholder="77.5946"
            value={form.pickup_lng}
            onChange={(e) =>
              setForm((s) => ({ ...s, pickup_lng: e.target.value }))
            }
            required
          />
          <Input
            label="Dropoff Lat"
            name="dropoff_lat"
            type="number"
            step="any"
            placeholder="12.985"
            value={form.dropoff_lat}
            onChange={(e) =>
              setForm((s) => ({ ...s, dropoff_lat: e.target.value }))
            }
            required
          />
          <Input
            label="Dropoff Lng"
            name="dropoff_lng"
            type="number"
            step="any"
            placeholder="77.6"
            value={form.dropoff_lng}
            onChange={(e) =>
              setForm((s) => ({ ...s, dropoff_lng: e.target.value }))
            }
            required
          />
          <div className="col-span-2">
            {error && (
              <div
                className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-2"
                role="alert"
              >
                {error}
              </div>
            )}
            <Button type="submit" disabled={loading} aria-busy={loading}>
              {loading ? "Booking..." : "Book Ride"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2">Trip Map</h2>
        <div
          className="h-64 rounded-lg bg-gradient-to-br from-blue-100 to-gray-50 border flex items-center justify-center text-gray-500"
          role="img"
          aria-label="Map placeholder"
        >
          Map preview
        </div>
        {ride && (
          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 text-blue-900 p-3 text-sm">
            <p>
              Ride requested. ID: <span className="font-mono">{ride.id}</span>
            </p>
            <p>Status: {ride.status}</p>
            <p>
              Fare estimate:{" "}
              {ride.fare_estimate != null ? `₹${ride.fare_estimate}` : "N/A"}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
