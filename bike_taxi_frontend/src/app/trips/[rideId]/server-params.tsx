"use server";

/**
 * PUBLIC_INTERFACE
 * generateStaticParams
 * For static export builds, ride IDs are not known at build time.
 * Export an empty array to allow the dynamic route to be exported
 * and hydrated on the client.
 */
export function generateStaticParams(): Array<{ rideId: string }> {
  return [];
}
