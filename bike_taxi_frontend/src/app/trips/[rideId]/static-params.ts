"use server";

/**
 * PUBLIC_INTERFACE
 * generateStaticParams
 * For static export builds, ride IDs are unknown at build time.
 * Exporting an empty array allows the route to be exported and then hydrated
 * client-side for real data via CSR.
 */
export function generateStaticParams(): Array<{ rideId: string }> {
  return [];
}
