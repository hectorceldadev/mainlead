import { GoHome } from '@/components/shared/GoHome'
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return <div className='min-h-screen flex justify-center items-center'>
        <GoHome />
        <SignUp />
    </div>
}