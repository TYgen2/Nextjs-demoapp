import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type SuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: SuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex h-12 w-full items-center justify-center rounded bg-green-100 text-sm text-green-500">
      <CheckCircleIcon className="mr-1" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
