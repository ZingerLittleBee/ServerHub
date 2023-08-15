import {
  addClientUrl,
  queryDiskByClientIdUrl,
  queryNetworkByClientIdUrl,
} from "@/requests/endpoint"
import instance from "@/requests/instance"
import {
  CreateClientVo,
  DiskDetailVo,
  NetworkInfoVo,
  Result,
} from "@server-octopus/types"





export const addClientRequest = async (name: string) => {
  const { data } = await instance.post<Result<CreateClientVo>>(addClientUrl, {
    name,
  })
  return data
}

export const queryNetworkByClientIdRequest = async (
  clientId: string
): Promise<Result<NetworkInfoVo[]>> => {
  const { data } = await instance.get<Result>(
    `${queryNetworkByClientIdUrl}/${clientId}`
  )
  return {
    ...data,
    data: JSON.parse(data.data) as NetworkInfoVo[],
  }
}

export const queryDiskByClientIdRequest = async (
  clientId: string
): Promise<Result<DiskDetailVo[]>> => {
  const { data } = await instance.get<Result>(
    `${queryDiskByClientIdUrl}/${clientId}`
  )
    return {
        ...data,
        data: JSON.parse(data.data) as DiskDetailVo[],
    }
}
