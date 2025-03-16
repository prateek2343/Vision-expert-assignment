import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginForm from './common/login-form'
import Social from './common/social'
import useDarkMode from '@/hooks/useDarkMode'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

// image import
import LogoWhite from '@/assets/images/logo/logo-white.svg'
import bgImage from "@/assets/images/all-img/login-bg.png";

const login = () => {
    const navigate = useNavigate()
    const [isDark] = useDarkMode()
    const { openOTPScreen, isAuth } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isAuth) {
            navigate('/dashboard')
        }
    }, [isAuth, navigate])
    return (
        <>
            <ToastContainer />
            <div className="loginwrapper">
                <div className="lg-inner-column">
                    <div className="right-column relative">
                        <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                            <div className="auth-box h-full flex flex-col justify-center">
                                <div className="mobile-logo text-center mb-6 lg:hidden block">
                                </div>
                                <div className="text-center 2xl:mb-10 mb-4">
                                    <h4 className="font-medium">Sign in</h4>
                                    <div className="text-slate-500 dark:text-slate-400 text-base">
                                        Enter Your Details to start using Gameon
                                    </div>
                                </div>
                                <LoginForm />
                            </div>
                            <div className="auth-footer text-center">
                                Copyright 2025, Dashcode All Rights Reserved.
                            </div>
                        </div>
                    </div>
                    <div
                        className="left-column bg-cover bg-no-repeat bg-center "
                        style={{
                            backgroundImage: `url(${bgImage})`,
                        }}
                    >
                        <div className="flex flex-col h-full justify-center">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login
