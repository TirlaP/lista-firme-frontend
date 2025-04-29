import { LoginForm } from "@/components/auth/LoginForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Building2 } from "lucide-react";
import { Navigate, useSearchParams } from "react-router-dom";

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");

  if (isAuthenticated) {
    console.log("AAaaa")
    return <Navigate to="/firme" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Building2 className="h-12 w-12 mx-auto text-blue-600" />
          <h2 className="text-3xl font-bold mt-6">Sign in to your account</h2>
          <p className="text-gray-500">
            Access Romania's largest companies database
          </p>
        </div>

        <div className="space-y-6 w-full">
          {verified && (
            <Alert className="border-green-500 bg-green-50">
              <AlertDescription>
                Your email has been verified. You can now sign in.
              </AlertDescription>
            </Alert>
          )}

          {reset && (
            <Alert className="border-green-500 bg-green-50">
              <AlertDescription>
                Your password has been reset. You can now sign in with your new
                password.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardContent className="pt-6">
              <LoginForm />
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
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
