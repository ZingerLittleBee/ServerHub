import { addClientUrl } from "@/requests/endpoint"
import instance from "@/requests/instance"
import { CreateClientVo, Result } from "@server-octopus/types"





export const addClientRequest = async (name: string) => {
  const { data } = await instance.post<Result<CreateClientVo>>(addClientUrl, {
    name,
  })
  return data
}
