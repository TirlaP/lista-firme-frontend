import { useAuth } from "@/hooks/useAuth";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onSubmit = async (values: LoginFormData) => {
    try {
      await login(values.email, values.password);
      navigate("/companies");
      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const renderIcon = (icon: React.ReactNode) => (
    <span className="text-gray-400">{icon}</span>
  );

  return (
    <Form
      form={form}
      name="login"
      onFinish={onSubmit}
      autoComplete="off"
      size="large"
      layout="vertical"
      requiredMark={false}
    >
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
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={renderIcon(<Lock size={18} />)}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-between items-center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Link 
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Sign in
        </Button>
      </Form.Item>

      <Divider plain>
        <span className="text-gray-500">New to Lista Firme?</span>
      </Divider>

      <Link to="/signup">
        <Button block>Create an account</Button>
      </Link>
    </Form>
  );
};