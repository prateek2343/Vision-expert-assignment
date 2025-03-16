// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { handleLogout } from '../pages/auth/common/store'

// Define your base query function with the API base URL
const getToken = () => {
    const token = localStorage.getItem('at')
    if (!token || typeof token == undefined || token == 'undefined') {
        return null
    }
    return JSON.parse(token)
}

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
        const token = getToken()
        if (token) {
            headers.set('at', token)
            headers.set('Content-Type', 'application/json')
        }
        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error?.status == 401) {
        const rt = localStorage.getItem('rt')
        if (rt) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/auth/admin/refresh`,
                    {
                        headers: { rt: JSON.parse(rt) },
                    }
                )
                if (response) {
                    // store the new at & rt
                    localStorage.setItem('at', JSON.stringify(response.data.at))
                    localStorage.setItem('rt', JSON.stringify(response.data.rt))
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                }
            } catch (error) {
                // Log out user if token refresh fails
                api.dispatch(handleLogout())
            }
        } else {
            // Log out user if refresh token is missing
            api.dispatch(handleLogout())
        }
    }
    return result
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['team', 'stations'],
    endpoints: (builder) => ({
    }),
})

export const { } = api
