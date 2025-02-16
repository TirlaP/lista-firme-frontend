import { useAuth } from "@/hooks/useAuth";
import { RegisterRequest } from "@/types/auth.types";
import { Form, Input, Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, User } from "lucide-react";

export const SignupForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onSubmit = async (values: RegisterRequest) => {
    try {
      const { confirmPassword, ...signupData } = values;
      await register(signupData);
      toast.success("Account created successfully! Please check your email for verification.");
      navigate("/verify-email-notice");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create account. Please try again."
      );
    }
  };

  const renderIcon = (icon: React.ReactNode) => (
    <span className="text-gray-400">{icon}</span>
  );

  return (
    <Form
      form={form}
      name="signup"
      onFinish={onSubmit}
      autoComplete="off"
      size="large"
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Please input your name!" },
          { min: 2, message: "Name must be at least 2 characters" },
        ]}
      >
        <Input 
          prefix={renderIcon(<User size={18} />)}
          placeholder="Full name" 
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input 
          prefix={renderIcon(<Mail size={18} />)}
          placeholder="Email address" 
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 8, message: "Password must be at least 8 characters" },
          {
            pattern: /[A-Z]/,
            message: "Password must contain at least one uppercase letter",
          },
          {
            pattern: /[a-z]/,
            message: "Password must contain at least one lowercase letter",
          },
          {
            pattern: /[0-9]/,
            message: "Password must contain at least one number",
          },
        ]}
      >
        <Input.Password
          prefix={renderIcon(<Lock size={18} />)}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={renderIcon(<Lock size={18} />)}
          placeholder="Confirm password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Create Account
        </Button>
      </Form.Item>

      <Divider plain>
        <span className="text-gray-500">Already have an account?</span>
      </Divider>

      <Link to="/login">
        <Button block>Sign in</Button>
      </Link>
    </Form>
  );
};