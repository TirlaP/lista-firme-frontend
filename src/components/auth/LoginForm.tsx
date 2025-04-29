import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      // Pass email and password as a single object to match the Jotai atom's expected format
      await login({ email: values.email, password: values.password });
      console.log("Hmmmm")
      navigate("/firme");
      toast.success("Welcome back!");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Please input your email!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email!",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    placeholder="Email address"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          rules={{ required: "Please input your password!" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label htmlFor="remember" className="text-sm">
                  Remember me
                </label>
              </FormItem>
            )}
          />

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
            New to Lista Firme?
          </span>
        </div>

        <Link to="/signup" className="block">
          <Button variant="outline" className="w-full">
            Create an account
          </Button>
        </Link>
      </form>
    </Form>
  );
};
