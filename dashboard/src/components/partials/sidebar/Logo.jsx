import React from 'react'
import { Link } from 'react-router-dom'
import useSkin from '@/hooks/useSkin'

const SidebarLogo = ({ menuHover }) => {
    const [skin] = useSkin()
    return (
        <div
            className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 
      ${menuHover ? 'logo-hovered' : ''}
      ${skin === 'bordered'
                    ? ' border-b border-r-0 border-slate-200 dark:border-slate-700'
                    : ' border-none'
                }
      
      `}
        >
            <Link to="/dashboard">
                <div className="flex items-center space-x-4">
                    <div className="logo-icon">
                        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                            Gameon
                        </h1>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default SidebarLogo
