import { CardWrapper } from "@/components/auth/card-wrapper";
import ResetForm from "@/components/auth/form/reset-form";

const ResetPage = () => {
  return (
    <CardWrapper
      headerLabel="Forgot your password? Reset it now✨"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial
    >
      <ResetForm />
    </CardWrapper>
  );
};

export default ResetPage;
