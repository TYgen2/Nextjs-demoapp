import { Button } from "@/components/ui/button"
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { googleLogin, githubLogin } from "@/actions/social-login"

const SocialLogin = () => {
    return (
        <div className="flex items-center justify-center gap-4 w-full">
            <Button className='flex flex-1 h-12 font-bold bg-black' onClick={googleLogin}>
                <GoogleIcon />
                <span className="bg-gradient-to-r from-blue-600 via-red-500 to-green-400
                    text-transparent bg-clip-text">Google</span>
            </Button>

            <Button className='flex flex-1 h-12 font-bold bg-black' onClick={githubLogin}>
                <GitHubIcon />
                <span className="bg-gradient-to-r from-[#5eead4] via-[#93c5fd] to-[#a78bfa]
                    text-transparent bg-clip-text">GitHub</span>
            </Button>
        </div>
    )
}

export default SocialLogin