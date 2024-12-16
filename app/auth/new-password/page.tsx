import { CardWrapper } from "@/components/auth/card-wrapper";
import NewPasswordForm from "@/components/auth/form/new-password-form";

const NewPasswordPage = () => {
    return (
        <CardWrapper
            headerLabel="Enter your new password✨"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <NewPasswordForm />
        </CardWrapper>
    );
};

export default NewPasswordPage;
