import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// home pages  & dashboard
const Dashboard = lazy(() => import('./pages/main/dashboard'))
const Login = lazy(() => import('./pages/auth/login'))
const ForgotPass = lazy(() => import('./pages/auth/forgot-password'))
const Error = lazy(() => import('./pages/404'))
import Layout from './layout/Layout'
import Loading from '@/components/Loading'

function App() {
    return (
        <main className="App relative">
            <Routes>
                {/* Public routes */}
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ForgotPass />
                        </Suspense>
                    }
                />
                <Route path="/*" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Route>
                <Route
                    path="/404"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Error />
                        </Suspense>
                    }
                />
            </Routes>
        </main>
    )
}

export default App
