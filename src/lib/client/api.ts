import axios, { AxiosError, AxiosResponse } from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  }, 
})


api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {

    if (error.response?.status === 401) {
      console.log("Unauthorized - redirect to login")
    }

    return Promise.reject(error)
  }
)

export default api