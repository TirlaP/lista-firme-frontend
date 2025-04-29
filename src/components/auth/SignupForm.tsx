import { Button } from "@/components/ui/button";
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
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { RegisterRequest } from "@/types/auth.types";

interface SignupFormData extends RegisterRequest {
  confirmPassword: string;
}

export const SignupForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupFormData) => {
    try {
      const { confirmPassword, ...signupData } = values;
      // The register function expects the raw data object
      await register(signupData);
      toast.success(
        "Account created successfully! Please check your email for verification.",
      );
      console.log("Hmmmm")
      navigate("/verify-email-notice");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create account. Please try again.",
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: "Please input your name!",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input placeholder="Full name" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          rules={{
            required: "Please input your password!",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Password must contain at least one uppercase letter",
              hasLowercase: (value) =>
                /[a-z]/.test(value) ||
                "Password must contain at least one lowercase letter",
              hasNumber: (value) =>
                /[0-9]/.test(value) ||
                "Password must contain at least one number",
            },
          }}
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

        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password!",
            validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match!",
          }}
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
                    placeholder="Confirm password"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
            Already have an account?
          </span>
        </div>

        <Link to="/login" className="block">
          <Button variant="outline" className="w-full">
            Sign in
          </Button>
        </Link>
      </form>
    </Form>
  );
};
