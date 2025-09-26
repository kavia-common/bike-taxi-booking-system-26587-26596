import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-gray-50 p-8 border border-blue-100">
        <h1 className="text-3xl font-bold text-gray-900">
          Your ride, simplified.
        </h1>
        <p className="mt-2 text-gray-600">
          Book bike taxis fast, track trips, and pay securely. Drivers manage
          availability and rides in a dedicated dashboard.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/rides/book">
            <Button>Book a Ride</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="secondary">Create Account</Button>
          </Link>
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-2">For Passengers</h3>
          <p className="text-sm text-gray-600">
            Request rides in seconds. Track progress and view your ride
            history.
          </p>
          <Link href="/rides/history" className="mt-3 inline-block">
            <Button variant="ghost">View History</Button>
          </Link>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-2">For Drivers</h3>
          <p className="text-sm text-gray-600">
            Manage availability, accept rides, and track trip status.
          </p>
          <Link href="/driver/dashboard" className="mt-3 inline-block">
            <Button variant="ghost">Open Dashboard</Button>
          </Link>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
          <p className="text-sm text-gray-600">
            Pay seamlessly when rides complete. Simple flow, clear statuses.
          </p>
          <Link href="/payments" className="mt-3 inline-block">
            <Button variant="ghost">Go to Payments</Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
