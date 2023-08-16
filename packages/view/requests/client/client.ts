import {
  addClientUrl,
  deleteClientUrl,
  getAllClientUrl,
} from "@/requests/endpoint"
import instance from "@/requests/instance"
import {
  ClientVo,
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
  url: string
): Promise<Result<NetworkInfoVo[]>> => {
  const { data } = await instance.get<Result>(url)
  return {
    ...data,
    data: JSON.parse(data.data) as NetworkInfoVo[],
  }
}

export const queryDiskByClientIdRequest = async (
  url: string
): Promise<Result<DiskDetailVo[]>> => {
  const { data } = await instance.get<Result>(url)
  return {
    ...data,
    data: JSON.parse(data.data) as DiskDetailVo[],
  }
}

export const getAllClientRequest = async (): Promise<Result<ClientVo[]>> => {
  const { data } = await instance.get<Result>(getAllClientUrl)
  return {
    ...data,
    data: data.data as ClientVo[],
  }
}

export const deleteClientRequest = async (clientId: string) => {
  const { data } = await instance.delete(`${deleteClientUrl}/${clientId}`)
  return {
    ...data,
  }
}
