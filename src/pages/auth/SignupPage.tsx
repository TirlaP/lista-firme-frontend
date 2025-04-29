import { SignupForm } from "@/components/auth/SignupForm";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Building2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export const SignupPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Building2 className="h-12 w-12 mx-auto text-blue-600" />
          <h2 className="text-3xl font-bold mt-6">Create your account</h2>
          <p className="text-gray-500">
            Get access to the largest Romanian companies database
          </p>
        </div>

        <div className="space-y-6 w-full">
          <Card>
            <CardContent className="pt-6">
              <SignupForm />
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <a href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
