import { AxiosError } from "axios"
import { ApiError } from "@/types/api"

export const getErrorMessage = (error: unknown): string => {

  const axiosError = error as AxiosError<ApiError>

  return (
    axiosError.response?.data?.message ||
    axiosError.message ||
    "Something went wrong"
  )
}