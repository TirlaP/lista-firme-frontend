import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Navigate, useSearchParams } from "react-router-dom";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail } = useAuth();

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["verifyEmail", token],
    queryFn: () => verifyEmail(token as string),
    enabled: !!token,
    retry: false,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {isLoading && (
          <div className="text-center">
            <Loader2 className="h-12 w-12 mx-auto text-blue-500 animate-spin" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Verifying your email...
            </h2>
            <p className="mt-2 text-gray-600">
              Please wait while we verify your email address.
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="text-center">
            <CheckCircle2 className="h-12 w-12 mx-auto text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Email Verified Successfully!
            </h2>
            <p className="mt-2 text-gray-600">
              Your email has been verified. You can now use all features of your
              account.
            </p>
            <a
              href="/login"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue to Login
            </a>
          </div>
        )}

        {isError && (
          <div className="text-center">
            <XCircle className="h-12 w-12 mx-auto text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Verification Failed
            </h2>
            <p className="mt-2 text-gray-600">
              We couldn't verify your email. The link may have expired or is
              invalid.
            </p>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
              <a
                href="/login"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Login
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
