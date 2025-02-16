import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/hooks/useAuth";
import { Card, Typography, Space } from "antd";
import { Navigate } from "react-router-dom";
import { Building2 } from "lucide-react";

const { Title, Text } = Typography;

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
          <Title level={2} className="mt-6">
            Create your account
          </Title>
          <Text type="secondary">
            Get access to the largest Romanian companies database
          </Text>
        </div>

        <Space direction="vertical" size="large" className="w-full">
          <Card>
            <SignupForm />
          </Card>

          <div className="text-center">
            <Text type="secondary" className="text-xs">
              By creating an account, you agree to our{" "}
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