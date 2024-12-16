import { useSearchParams } from "next/navigation";

interface UseTokenReturn {
  token: string | null;
  callbackUrl?: string | null;
}

const useTokenParams = (): UseTokenReturn => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const callbackUrl = searchParams.get("callbackUrl");

  return { token, callbackUrl };
};

export default useTokenParams;
