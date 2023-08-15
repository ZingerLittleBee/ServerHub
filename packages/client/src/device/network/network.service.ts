import { Inject, Injectable } from '@nestjs/common'
import {
    kClientNetworkQueryById,
    kStorageService
} from '@server-octopus/shared'
import { ClientProxy } from '@nestjs/microservices'
import {
    ClientNetworkQueryByIdPayload,
    ClientNetworkQueryByIdResult,
    NetworkInfoDto
} from '@server-octopus/types'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class NetworkService {
    constructor(@Inject(kStorageService) private storageClient: ClientProxy) {}

    async queryByClientId(clientId: string): Promise<NetworkInfoDto[]> {
        const { success, message, data } = await firstValueFrom(
            this.storageClient.send<
                ClientNetworkQueryByIdResult,
                ClientNetworkQueryByIdPayload
            >(kClientNetworkQueryById, {
                clientId
            })
        )
        if (!success || !data) {
            throw new Error(`Query network failed: ${message}`)
        }
        return data
    }
}
