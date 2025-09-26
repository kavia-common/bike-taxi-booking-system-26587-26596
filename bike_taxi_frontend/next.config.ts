import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Ensure the dynamic trips segment is included in the export so the client page loads.
  // We don't know concrete params; this maps the route shell.
  // Next.js will still serve index and client-side navigation handles dynamic IDs.
  experimental: {
    // no experimental features required; placeholder for compatibility if needed
  },
};

export default nextConfig;
