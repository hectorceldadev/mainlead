import { GoHome } from '@/components/shared/GoHome'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <GoHome />
            <SignIn />
        </div>
    )
}