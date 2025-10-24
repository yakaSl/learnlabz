
import { SignUpForm } from "@/components/auth/sign-up-form";
import AuthLayout from "@/components/auth/auth-layout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information to create a tutor account"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
