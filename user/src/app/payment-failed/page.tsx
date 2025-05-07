import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-red-700">
      <XCircle size={80} className="mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        Something went wrong while processing your payment. Please try again or
        use a different method.
      </p>
      <Link href="/course">
        <Button
          variant="outline"
          className="border-red-700 text-red-700 hover:bg-red-100"
        >
          Browse Courses
        </Button>
      </Link>
    </div>
  );
};

export default PaymentFailed;
