"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { apiFetch, type ApiError } from "@/lib/api";

interface PaymentOut {
  id: string;
  ride_id: string;
  amount: number;
  currency: string;
  status: string;
  provider_ref?: string | null;
  created_at: string;
}

export default function PaymentsPage() {
  const [rideId, setRideId] = useState("");
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<PaymentOut | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function initPayment(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await apiFetch<PaymentOut>("/payments/init", {
        method: "POST",
        body: { ride_id: rideId },
      });
      setPayment(res);
    } catch (error: unknown) {
      const message =
        (error as ApiError)?.message ||
        (error as Error)?.message ||
        "Failed to initiate payment";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h1 className="text-xl font-semibold mb-4">Payments</h1>
        <form onSubmit={initPayment} className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              label="Ride ID"
              placeholder="Enter completed ride ID"
              value={rideId}
              onChange={(e) => setRideId(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? "Processing..." : "Initiate"}
          </Button>
        </form>
        {err && (
          <p className="text-sm text-red-600 mt-3" role="alert">
            {err}
          </p>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-2">Payment Status</h2>
        {payment ? (
          <div className="text-sm">
            <p>
              Payment ID: <span className="font-mono">{payment.id}</span>
            </p>
            <p>
              Ride ID: <span className="font-mono">{payment.ride_id}</span>
            </p>
            <p>
              Amount: {payment.currency} {payment.amount}
            </p>
            <p>Status: {payment.status}</p>
            <p>Ref: {payment.provider_ref || "—"}</p>
            <p>
              Created: {new Date(payment.created_at).toLocaleString()}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-600">No payment yet.</p>
        )}
      </Card>
    </div>
  );
}
