
import { LoginForm } from "@/components/auth/login-form";
import AuthLayout from "@/components/auth/auth-layout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back!"
      description="Enter your email below to log in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
