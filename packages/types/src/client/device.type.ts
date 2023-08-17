import { FormatData } from "./fusion.type";

export type DiskDetail = {
    disk_type: string;
    device_name: string;
    file_system: string;
    total_space: FormatData;
    available_space: FormatData;
    is_removable: boolean;
};

export type DiskDetailDto = {
    type?: string
    name?: string
    file_system?: string
    total?: string
    available?: string
    removeable?: boolean
}

export type NetworkInfo = {
    name: string
    // ip: string
    mac: string
    rx: FormatData
    tx: FormatData
}

export type NetworkInfoDto = Omit<NetworkInfo, 'rx' | 'tx'> & {
    rx: string
    tx: string
}

export type CreateDevice = {
    name: string
    hostname: string
    kernel: string
    cpu_num: number
    brand: string
    frequency: string
    vendor: string
    memory: FormatData
    swap: FormatData
    version: string
    disk: DiskDetail[]
    network: NetworkInfo[]
}

export type DeviceDto = {
    name?: string
    hostname?: string
    kernel?: string
    cpu_num?: number
    brand?: string
    frequency?: string
    vendor?: string
    memory?: string
    swap?: string
    version?: string
    disk?: DiskDetailDto[]
    network?: NetworkInfoDto[]
}

export type DeviceVo = DeviceDto

export type CreateDeviceDto = DeviceDto

export type NetworkInfoVo = NetworkInfoDto
export type DiskDetailVo = DiskDetailDto
