import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'simplebar-react/dist/simplebar.min.css'
import 'flatpickr/dist/themes/light.css'
import '../src/assets/scss/app.scss'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import store from './store'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AxiosInterceptor } from './api/axiosInterceptor'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <BrowserRouter>
            <Provider store={store}>
                <AxiosInterceptor>
                    <ToastContainer />
                    <App />
                </AxiosInterceptor>
            </Provider>
        </BrowserRouter>
    </>
)
