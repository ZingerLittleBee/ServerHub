import {
  getAllClientRequest,
  queryDiskByClientIdRequest,
  queryNetworkByClientIdRequest,
} from "@/requests/client/client"
import {
  getAllClientUrl,
  queryDiskByClientIdUrl,
  queryNetworkByClientIdUrl,
} from "@/requests/endpoint"
import useSWR from "swr"

export function useNetwork(clientId: string) {
  const { data, error, isLoading } = useSWR(
    `${queryNetworkByClientIdUrl}/${clientId}`,
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
    `${queryDiskByClientIdUrl}/${clientId}`,
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
  return {
    clients: data?.data,
    isLoading,
    isError: error,
  }
}
