import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type ErrorProps = {
    message?: string
}

const FormError = ({ message }: ErrorProps) => {
    if (!message) return null;

    return (
        <div className="flex w-full h-12 rounded text-sm justify-center items-center bg-red-100 text-red-500">
            <ErrorOutlineIcon className="mr-1" />
            <p>{message}</p>
        </div>
    )
}

export default FormError