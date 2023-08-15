import { Inject, Injectable, Logger } from '@nestjs/common'
import { inspect } from 'util'
import {
    kAuthService,
    kClientCreateMsg,
    kClientDeviceUpdateEvent,
    kClientGetAll,
    kClientTokenSign,
    kClientTokenValid,
    kFusionPersistentAddEvent,
    kFusionRealtimeAddEvent,
    kStorageService
} from '@server-octopus/shared'
import { ClientProxy } from '@nestjs/microservices'
import {
    ClientGetAllResult,
    ClientPayload,
    ClientVo,
    CreateClientDto,
    CreateClientResult,
    CreateDevice,
    DeviceDto,
    DiskDetailDto,
    FusionDto,
    NetworkInfoDto,
    RegisterClientDto,
    Result,
    UpdateDeviceDto
} from '@server-octopus/types'
import { firstValueFrom } from 'rxjs'
import { formatDataToString } from '@/util'

@Injectable()
export class ClientService {
    private readonly logger = new Logger(ClientService.name)

    constructor(
        @Inject(kAuthService) private authClient: ClientProxy,
        @Inject(kStorageService) private storageClient: ClientProxy
    ) {}

    async getAll() {
        const { success, message, data } = await firstValueFrom(
            this.storageClient.send<ClientGetAllResult>(kClientGetAll, {})
        )
        if (!success) {
            this.logger.error(`Get all client error, message: ${message}`)
            throw new Error(message)
        }
        return data as ClientVo[]
    }

    async registerClient({ clientId, device }: RegisterClientDto) {
        const { success, message } = await firstValueFrom(
            this.storageClient.send<Result, UpdateDeviceDto>(
                kClientDeviceUpdateEvent,
                {
                    clientId,
                    device
                }
            )
        )
        if (!success) {
            this.logger.error(
                `Register device: ${inspect(
                    clientId
                )} error, message: ${message}`
            )
            throw new Error(message)
        }
    }

    async isTokenValid(token: string) {
        const { success, message, data } = await firstValueFrom(
            this.authClient.send<Result<boolean>>(kClientTokenValid, { token })
        )
        if (!success) {
            this.logger.error(`token: ${token} invalid, message: ${message}`)
            return false
        }
        return data
    }

    async addRealtimeData(fusion: FusionDto) {
        this.storageClient.emit(kFusionRealtimeAddEvent, fusion)
    }

    async addPersistentData(fusion: FusionDto) {
        this.storageClient.emit(kFusionPersistentAddEvent, fusion)
    }

    async create(client: CreateClientDto) {
        const { success, message, data } = await firstValueFrom(
            this.storageClient.send<CreateClientResult, CreateClientDto>(
                kClientCreateMsg,
                client
            )
        )
        if (!success) {
            this.logger.error(
                `create client: ${inspect(client)} error, message: ${message}`
            )
            throw new Error(message)
        }
        return data
    }

    async signToken(userId: string, clientId: string): Promise<string> {
        const { success, message, data } = await firstValueFrom(
            this.authClient.send<Result<string>, ClientPayload>(
                kClientTokenSign,
                { userId, clientId }
            )
        )
        if (!success || !data) {
            this.logger.error(
                `sign token: ${inspect({
                    userId,
                    clientId
                })} error, message: ${message}`
            )
            throw new Error(message)
        }
        return data
    }

    deviceToDto(device: CreateDevice): DeviceDto {
        return {
            name: device.name,
            hostname: device.hostname,
            kernel: device.kernel,
            cpu_num: device.cpu_num,
            brand: device.brand,
            frequency: device.frequency,
            vendor: device.vendor,
            memory: formatDataToString(device.memory),
            swap: formatDataToString(device.swap),
            version: device.version,
            disk: device.disk.map<DiskDetailDto>((disk) => ({
                type: disk.disk_type,
                name: disk.device_name,
                file_system: disk.file_system,
                total: formatDataToString(disk.total_space),
                available: formatDataToString(disk.available_space),
                removeable: disk.is_removable
            })),
            network: device.network.map<NetworkInfoDto>((network) => ({
                name: network.name,
                mac: network.mac,
                rx: formatDataToString(network.rx),
                tx: formatDataToString(network.tx)
            }))
        }
    }
}
