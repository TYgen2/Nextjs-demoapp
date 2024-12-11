import { Button } from "@/components/ui/button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { googleLogin, githubLogin } from "@/actions/social-login";

const SocialLogin = () => {
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <Button
        className="flex h-12 flex-1 bg-black font-bold"
        onClick={googleLogin}
      >
        <GoogleIcon />
        <span className="bg-gradient-to-r from-blue-600 via-red-500 to-green-400 bg-clip-text text-transparent">
          Google
        </span>
      </Button>

      <Button
        className="flex h-12 flex-1 bg-black font-bold"
        onClick={githubLogin}
      >
        <GitHubIcon />
        <span className="bg-gradient-to-r from-[#5eead4] via-[#93c5fd] to-[#a78bfa] bg-clip-text text-transparent">
          GitHub
        </span>
      </Button>
    </div>
  );
};

export default SocialLogin;
