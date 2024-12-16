import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type ErrorProps = {
  message?: string;
};

const FormError = ({ message }: ErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex h-12 w-full items-center justify-center rounded bg-red-100 text-sm text-red-500">
      <ErrorOutlineIcon className="mr-1" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
