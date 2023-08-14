import { Inject, Injectable } from '@nestjs/common'
import { kClientDiskQueryById, kStorageService } from '@server-octopus/shared'
import { ClientProxy } from '@nestjs/microservices'
import {
    ClientDiskQueryByIdPayload,
    ClientDiskQueryByIdResult,
    DiskDetailVo
} from '@server-octopus/types'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class DiskService {
    constructor(@Inject(kStorageService) private storageClient: ClientProxy) {}

    async queryByClientId(clientId: string): Promise<DiskDetailVo[]> {
        const { success, message, data } = await firstValueFrom(
            this.storageClient.emit<
                ClientDiskQueryByIdResult,
                ClientDiskQueryByIdPayload
            >(kClientDiskQueryById, {
                clientId
            })
        )
        if (!success || !data) {
            throw new Error(`Query disk failed: ${message}`)
        }
        return data as DiskDetailVo[]
    }
}
