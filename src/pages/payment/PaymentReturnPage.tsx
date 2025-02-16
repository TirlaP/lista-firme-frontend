import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { subscriptionService } from "@/services/subscription.service";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const PaymentReturnPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const validatePayment = async () => {
      try {
        const paymentId = searchParams.get("payment_id");
        if (!paymentId) {
          setStatus("error");
          setMessage("Invalid payment reference");
          return;
        }

        const response = await subscriptionService.validatePayment(paymentId);
        if (response.success) {
          setStatus("success");
          setMessage("Payment processed successfully");
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(response.message || "Payment validation failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Failed to validate payment");
      }
    };

    validatePayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        {status === "loading" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <h2 className="mt-4 text-xl font-semibold">Processing payment...</h2>
            <p className="mt-2 text-gray-600">Please wait while we verify your payment</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-green-600">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <p className="mt-2 text-sm text-gray-500">Redirecting to dashboard...</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-red-600">Payment Failed</h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <div className="mt-6 space-y-3">
              <Button
                onClick={() => navigate("/subscription/plans")}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="ghost"
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};