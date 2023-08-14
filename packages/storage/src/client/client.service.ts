import { PrismaService } from '@/db/prisma.service'
import { Injectable } from '@nestjs/common'
import { StatusEnum } from '@server-octopus/shared'
import {
    CreateClientDto,
    DiskDetailDto,
    NetworkInfoDto,
    UpdateDeviceDto
} from '@server-octopus/types'

@Injectable()
export class ClientService {
    constructor(private readonly prismaService: PrismaService) {}

    async create({ name, userId }: CreateClientDto) {
        return this.prismaService.client.create({
            data: {
                name: name,
                status: StatusEnum.UNKNOWN,
                user_id: userId
            }
        })
    }

    async updateClientDevice({ clientId, device }: UpdateDeviceDto) {
        return this.prismaService.client.update({
            where: {
                client_id: clientId
            },
            data: {
                device: {
                    upsert: {
                        create: {
                            name: device.name,
                            hostname: device.hostname,
                            kernel: device.kernel,
                            cpu_num: device.cpu_num,
                            brand: device.brand,
                            frequency: device.frequency,
                            vendor: device.vendor,
                            memory: device.memory,
                            swap: device.swap,
                            version: device.version,
                            disk: JSON.stringify(device.disk),
                            network: JSON.stringify(device.network)
                        },
                        update: {
                            name: device.name,
                            hostname: device.hostname,
                            kernel: device.kernel,
                            cpu_num: device.cpu_num,
                            brand: device.brand,
                            frequency: device.frequency,
                            vendor: device.vendor,
                            memory: device.memory,
                            swap: device.swap,
                            version: device.version,
                            disk: JSON.stringify(device.disk),
                            network: JSON.stringify(device.network)
                        }
                    }
                }
            }
        })
    }

    async queryClientNetworkById(clientId: string): Promise<NetworkInfoDto[]> {
        const json = await this.prismaService.device.findUnique({
            where: {
                client_id: clientId
            },
            select: {
                network: true
            }
        })
        return json === null || json.network === null
            ? []
            : (json.network as NetworkInfoDto[])
    }

    async queryClientDiskById(clientId: string): Promise<DiskDetailDto[]> {
        const json = await this.prismaService.device.findUnique({
            where: {
                client_id: clientId
            },
            select: {
                disk: true
            }
        })
        return json === null || json.disk === null
            ? []
            : (json.disk as DiskDetailDto[])
    }
}
