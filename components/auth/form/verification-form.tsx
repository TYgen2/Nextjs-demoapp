"use client";

import { newVerification } from "@/actions/new-verification";
import { useCallback, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import FormSuccess from "../form-message/form-success";
import FormError from "../form-message/form-error";
import useFormState from "@/hooks/use-form";
import useTokenParams from "@/hooks/use-token-params";

const NewVerificationForm = () => {
  const { token } = useTokenParams();

  const { error, setError, success, setSuccess } = useFormState();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <span className="text-xl font-bold text-white">
        Confirming your verification
      </span>
      {!success && !error && <BeatLoader />}
      <FormSuccess message={success} />
      <FormError message={error} />
    </>
  );
};

export default NewVerificationForm;
