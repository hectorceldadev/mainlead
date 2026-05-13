'use client'

import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const ToggleTheme = () => {
    const [isDark, setIsDark] = useState<boolean>(true)

    useEffect(() => {
        if (isDark) document.documentElement.classList.add('dark')
    }, [isDark])

    return (
        <div className='absolute top-4 right-4 flex gap-2 items-center'>
            <Switch onClick={() => {
                document.documentElement.classList.toggle("dark")
                setIsDark(!isDark)
            }}/>
            {isDark ? (
                <Sun className={`w-4 h-4 text-gray-400/80`}/>
            ) : (
                <Moon className={`w-4 h-4`}/>
            )}
        </div>
    )
}

export default ToggleTheme
