import { useState, useTransition } from 'react'

interface UseAuthFormReturn {
    error: string | undefined;
    success: string | undefined;
    isPending: boolean;
    setError: (error: string | undefined) => void;
    setSuccess: (success: string | undefined) => void;
    startTransition: (callback: () => void) => void;
    resetMessages: () => void;
}

const useAuthForm = (): UseAuthFormReturn => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const resetMessages = () => {
        setError("");
        setSuccess("");
    }

    return {
        error,
        setError,
        success,
        setSuccess,
        isPending,
        resetMessages,
        startTransition
    }
}

export default useAuthForm