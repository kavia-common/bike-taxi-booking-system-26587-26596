import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside
      className="hidden md:block w-64 shrink-0 border-r bg-white"
      aria-label="Sidebar"
    >
      <div className="p-4">
        <nav className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Passenger
          </p>
          <Link
            href="/rides/book"
            className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
          >
            Book a Ride
          </Link>
          <Link
            href="/rides/history"
            className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
          >
            Ride History
          </Link>
          <p className="text-xs uppercase tracking-wider text-gray-500 mt-4 mb-2">
            Driver
          </p>
          <Link
            href="/driver/dashboard"
            className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
          >
            Dashboard
          </Link>
          <Link
            href="/driver/profile"
            className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
          >
            Profile
          </Link>
        </nav>
      </div>
    </aside>
  );
}
