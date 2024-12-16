import RegisterForm from "@/components/auth/form/register-form";
import { CardWrapper } from "@/components/auth/card-wrapper";

const RegisterPage = () => {
  return (
    <CardWrapper
      headerLabel="Welcome✨Register now!"
      backButtonLabel="Already have an account? Login"
      backButtonHref="/auth/login"
      showSocial
    >
      <RegisterForm />
    </CardWrapper>
  );
};

export default RegisterPage;
