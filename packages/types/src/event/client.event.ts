import { ClientDto, DiskDetailDto, NetworkInfoDto } from "../client/index";
import { Result } from "../result.type";

export type ClientNetworkQueryByIdPayload = {
    clientId: string;
};
export type ClientNetworkQueryByIdResult = Result<NetworkInfoDto[]>

export type ClientDiskQueryByIdPayload = {
    clientId: string
}
export type ClientDiskQueryByIdResult = Result<DiskDetailDto[]>

export type ClientGetAllResult = Result<ClientDto[]>
