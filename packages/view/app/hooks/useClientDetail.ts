import {
  getAllClientRequest,
  queryDiskByClientIdRequest,
  queryNetworkByClientIdRequest,
} from "@/requests/client/client"
import { getAllClientUrl } from "@/requests/endpoint"
import useSWR from "swr"

export function useNetwork(clientId: string) {
  const { data, error, isLoading } = useSWR(
    clientId,
    queryNetworkByClientIdRequest
  )

  return {
    networks: data?.data,
    isLoading,
    isError: error,
  }
}

export function useDisk(clientId: string) {
  const { data, error, isLoading } = useSWR(
    clientId,
    queryDiskByClientIdRequest
  )

  return {
    disks: data?.data,
    isLoading,
    isError: error,
  }
}

export function useAllClient() {
  const { data, error, isLoading } = useSWR(
    getAllClientUrl,
    getAllClientRequest
  )
  console.log('useAllClient', data)

  return {
    clients: data?.data,
    isLoading,
    isError: error,
  }
}
