import { CardWrapper } from "@/components/auth/card-wrapper";
import NewVerificationForm from "@/components/auth/form/verification-form";

const NewVerificationPage = () => {
  return (
    <CardWrapper
      headerLabel="Verification✨"
      backButtonLabel="Return to login"
      backButtonHref="/auth/login"
    >
      <NewVerificationForm />
    </CardWrapper>
  )
};

export default NewVerificationPage;
