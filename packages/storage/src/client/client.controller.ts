import { ErrorUtil } from '@/db/error.util'
import { ResultUtil } from '@/utils/result.util'
import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern } from '@nestjs/microservices'
import {
    kClientCreateMsg,
    kClientDeleteEvent,
    kClientDeviceUpdateEvent,
    kClientDiskQueryById,
    kClientGetAll,
    kClientNetworkQueryById,
    kClientUpdate
} from '@server-octopus/shared'
import {
    ClientDiskQueryByIdResult,
    ClientGetAllResult,
    ClientNetworkQueryByIdPayload,
    ClientNetworkQueryByIdResult,
    ClientStatus,
    CreateClientDto,
    CreateClientResult,
    TokenPayload,
    UpdateClientDto,
    UpdateDeviceDto
} from '@server-octopus/types'
import { ClientService } from './client.service'

@Controller()
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
        private readonly errorUtil: ErrorUtil
    ) {}

    // @MessagePattern(kClientUpsertEvent)
    // async upsertClient(client: ClientDto): Promise<Result<string>> {
    //     try {
    //         return ResultUtil.ok(await this.clientService.upsertClient(client))
    //     } catch (e) {
    //         return ResultUtil.error(this.errorUtil.explain(e))
    //     }
    // }

    @MessagePattern(kClientCreateMsg)
    async createClient(client: CreateClientDto): Promise<CreateClientResult> {
        try {
            const { client_id, status, name, updated_at } =
                await this.clientService.create(client)
            return ResultUtil.ok({
                clientId: client_id,
                name: name,
                status: status as ClientStatus,
                lastCommunication: updated_at
            })
        } catch (e) {
            return ResultUtil.error(this.errorUtil.explain(e))
        }
    }

    @MessagePattern(kClientDeviceUpdateEvent)
    async updateClientDevice(data: UpdateDeviceDto) {
        try {
            await this.clientService.updateClientDevice(data)
            return ResultUtil.ok()
        } catch (e) {
            return ResultUtil.error(this.errorUtil.explain(e))
        }
    }

    @MessagePattern(kClientNetworkQueryById)
    async queryClientNetworkById({
        clientId
    }: ClientNetworkQueryByIdPayload): Promise<ClientNetworkQueryByIdResult> {
        try {
            return ResultUtil.ok(
                await this.clientService.queryClientNetworkById(clientId)
            )
        } catch (e) {
            return ResultUtil.error(e)
        }
    }

    @MessagePattern(kClientDiskQueryById)
    async queryClientDiskById({
        clientId
    }: ClientNetworkQueryByIdPayload): Promise<ClientDiskQueryByIdResult> {
        try {
            return ResultUtil.ok(
                await this.clientService.queryClientDiskById(clientId)
            )
        } catch (e) {
            return ResultUtil.error(e)
        }
    }

    @MessagePattern(kClientGetAll)
    async getAll(): Promise<ClientGetAllResult> {
        try {
            return ResultUtil.ok(await this.clientService.getAll())
        } catch (e) {
            return ResultUtil.error(e)
        }
    }

    @EventPattern(kClientDeleteEvent)
    async handleClientDelete({ clientId }: TokenPayload) {
        await this.clientService.deleteClient(clientId)
    }

    @MessagePattern(kClientUpdate)
    async updateClient(client: UpdateClientDto) {
        try {
            await this.clientService.updateClient(client)
            return ResultUtil.ok()
        } catch (e) {
            return ResultUtil.error(e)
        }
    }
}
