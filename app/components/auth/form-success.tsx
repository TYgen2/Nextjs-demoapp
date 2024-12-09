import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type SuccessProps = {
    message?: string
}

const FormSuccess = ({ message }: SuccessProps) => {
    if (!message) return null;

    return (
        <div className="flex w-full h-12 rounded text-sm justify-center items-center bg-green-100 text-green-500">
            <CheckCircleIcon className="mr-1" />
            <p>{message}</p>
        </div>
    )
}

export default FormSuccess