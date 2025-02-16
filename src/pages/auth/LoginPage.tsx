import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { Card, Typography, Space, Alert } from "antd";
import { Navigate, useSearchParams } from "react-router-dom";
import { Building2 } from "lucide-react";

const { Title, Text } = Typography;

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");

  if (isAuthenticated) {
    return <Navigate to="/companies" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Building2 className="h-12 w-12 mx-auto text-blue-600" />
          <Title level={2} className="mt-6">
            Sign in to your account
          </Title>
          <Text type="secondary">
            Access Romania's largest companies database
          </Text>
        </div>

        <Space direction="vertical" size="large" className="w-full">
          {verified && (
            <Alert
              message="Email Verified Successfully"
              description="Your email has been verified. You can now sign in."
              type="success"
              showIcon
            />
          )}

          {reset && (
            <Alert
              message="Password Reset Successfully"
              description="Your password has been reset. You can now sign in with your new password."
              type="success"
              showIcon
            />
          )}

          <Card>
            <LoginForm />
          </Card>

          <div className="text-center">
            <Text type="secondary" className="text-xs">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </Text>
          </div>
        </Space>
      </div>
    </div>
  );
};