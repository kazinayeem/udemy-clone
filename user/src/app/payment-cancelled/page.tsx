import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50 text-yellow-700">
      <Ban size={80} className="mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        You have cancelled the payment. You can always try again later.
      </p>
      <Link href="/course">
        <Button
          variant="outline"
          className="border-yellow-700 text-yellow-700 hover:bg-yellow-100"
        >
          Browse Courses
        </Button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
