import { Os, Overview, Process, Realtime } from "../fusion.type";
import { Result } from "../result.type";
import { TokenPayload } from "../token/index";
import { DeviceDto, DeviceVo } from "./device.type";

export enum ClientStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DISABLED = "DISABLED",
    UNKNOWN = "UNKNOWN",
}

export type CreateClientResult = Result<ClientVo>;

export type ClientVo = {
    clientId: string;
    name: string;
    status: ClientStatus;
    lastCommunication: Date;
    device?: DeviceVo;
};

export type CreateClientVo = ClientVo & { token: string };

export type CreateClientDto = {
    name: string;
    userId?: string;
};

export type FusionDto = {
    overview: Overview;
    os?: Os;
    realtime?: Realtime;
    fullProcess?: Process[];
    clientId: string;
    time: number;
};

export type ClientPayload = TokenPayload;

export type ClientVerifyResult = Result<ClientPayload>;

export type UpdateDeviceDto = {
    clientId: string;
    device: DeviceDto;
};

export type RegisterClientDto = {
    clientId: string;
    userId: string;
    device: DeviceDto;
};

export type ClientDto = {
    clientId: string;
    name: string;
    status: ClientStatus;
    lastCommunication: Date;
};

export type UpdateClientDto = Partial<
    Omit<ClientDto, "lastCommunication" | "clientId">
> & { clientId: string };
