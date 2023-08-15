import {
  queryDiskByClientIdRequest,
  queryNetworkByClientIdRequest,
} from "@/requests/client/client"
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
    const { data, error, isLoading } = useSWR(clientId, queryDiskByClientIdRequest)

    return {
        disks: data?.data,
        isLoading,
        isError: error,
    }
}
