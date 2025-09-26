import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="app-container flex items-center justify-center p-6">
      <section className="card max-w-lg w-full" role="alert" aria-live="assertive">
        <header className="header mb-4">
          <h1 className="title">404 – Page Not Found</h1>
          <p className="subtitle">The page you’re looking for doesn’t exist.</p>
        </header>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </section>
    </main>
  );
}
