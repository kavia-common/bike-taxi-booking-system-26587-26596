"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/lib/store";
import Button from "../ui/Button";

export default function TopNav() {
  const { auth, performLogout } = useAuth();

  return (
    <nav
      className="w-full sticky top-0 z-40 border-b bg-white/80 backdrop-blur"
      role="navigation"
      aria-label="Top Navigation"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            B
          </span>
          <span className="text-lg font-semibold text-gray-900">
            Bike Taxi
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/rides/book"
            className="text-sm text-gray-700 hover:text-blue-700"
          >
            Book a Ride
          </Link>
          <Link
            href="/rides/history"
            className="text-sm text-gray-700 hover:text-blue-700"
          >
            Ride History
          </Link>
          <Link
            href="/driver/dashboard"
            className="text-sm text-gray-700 hover:text-blue-700"
          >
            Driver
          </Link>
          {!auth.isAuthenticated ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button variant="danger" onClick={performLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
