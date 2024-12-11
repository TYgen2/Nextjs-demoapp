import LoginForm from "@/components/auth/form/login-form";
import { CardWrapper } from "@/components/auth/card-wrapper";

const LoginPage = () => {
  return (
    <CardWrapper
      headerLabel="Welcome✨Please login in"
      backButtonLabel="Don't have an account? Register"
      backButtonHref="/auth/register"
      showSocial
    >
      <LoginForm />
    </CardWrapper>
  );
};

export default LoginPage;
