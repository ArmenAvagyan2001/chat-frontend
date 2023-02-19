import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry && window.localStorage.getItem('token')) {
        originalRequest._isRetry = true
        await axios.get(`${API_URL}/api/refresh`)
            .then(res => {
                window.localStorage.setItem("token", res.data.accessToken)
            }).catch(async ({response}) => {
                console.log(response)
                window.localStorage.clear()
                // window.location.reload()
            })

        return $api.request(originalRequest);
    }
    throw error
});

export default $api;
