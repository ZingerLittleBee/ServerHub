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
                            disk: {
                                create: device.disk.map<DiskDetailDto>(
                                    (disk) => ({
                                        ...disk
                                    })
                                )
                            },
                            network: {
                                create: device.network.map<NetworkInfoDto>(
                                    (network) => ({
                                        ...network
                                    })
                                )
                            }
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
                            disk: {
                                deleteMany: {
                                    client_id: clientId
                                },
                                create: device.disk.map<DiskDetailDto>(
                                    (disk) => ({
                                        ...disk
                                    })
                                )
                            },
                            network: {
                                deleteMany: {
                                    client_id: clientId
                                },
                                create: device.network.map<NetworkInfoDto>(
                                    (network) => ({
                                        ...network
                                    })
                                )
                            }
                        }
                    }
                }
            }
        })
    }

    // async getClientByClientId(clientId: string): Promise<ClientDto> {
    //     const {
    //         name,
    //         device,
    //         user_id: userId
    //     } = await this.prismaService.client.findUnique({
    //         where: {
    //             client_id: clientId
    //         },
    //         include: {
    //             device: {
    //                 include: {
    //                     network: true,
    //                     disk: true
    //                 }
    //             }
    //         }
    //     })
    //     return {
    //         name,
    //         device: {
    //             name: device.name,
    //             hostname: device.hostname,
    //             kernel: device.kernel,
    //             cpu_num: device.cpu_num,
    //             brand: device.brand,
    //             frequency: device.frequency,
    //             vendor: device.vendor,
    //             memory: device.memory,
    //             swap: device.swap,
    //             version: device.version,
    //             disk: device.disk.map<DiskDetailDto>((disk) => ({
    //                 disk_type: disk.type,
    //                 device_name: disk.name,
    //                 file_system: disk.file_system,
    //                 total_space: disk.total,
    //                 available_space: disk.available,
    //                 is_removable: disk.removeable
    //             })),
    //             network: device.network.map<NetworkInfoDto>((network) => ({
    //                 name: network.name,
    //                 mac: network.mac,
    //                 rx: network.rx,
    //                 tx: network.tx
    //             }))
    //         } as DeviceDto,
    //         clientId,
    //         userId
    //     } as ClientDto
    // }

    // async upsertClient(client: ClientDto) {
    //     const { client_id } = await this.prismaService.client.upsert({
    //         where: {
    //             id: -1,
    //             client_id: client.clientId
    //         },
    //         create: {
    //             name: client.name,
    //             status: StatusEnum.ACTIVE,
    //             user_id: client.userId,
    //             device: {
    //                 create: {
    //                     name: client.device.name,
    //                     hostname: client.device.hostname,
    //                     kernel: client.device.kernel,
    //                     cpu_num: client.device.cpu_num,
    //                     brand: client.device.brand,
    //                     frequency: client.device.frequency,
    //                     vendor: client.device.vendor,
    //                     memory: client.device.memory,
    //                     swap: client.device.swap,
    //                     version: client.device.version,
    //                     disk: {
    //                         create: client.device.disk.map((disk) => ({
    //                             type: disk.disk_type,
    //                             name: disk.device_name,
    //                             file_system: disk.file_system,
    //                             total: disk.total_space,
    //                             available: disk.available_space,
    //                             removeable: disk.is_removable
    //                         }))
    //                     },
    //                     network: {
    //                         create: client.device.network.map((network) => ({
    //                             name: network.name,
    //                             mac: network.mac,
    //                             rx: network.rx,
    //                             tx: network.tx
    //                         }))
    //                     }
    //                 }
    //             }
    //         },
    //         update: {
    //             name: client.name,
    //             status: StatusEnum.ACTIVE,
    //             user_id: client.userId,
    //             device: {
    //                 update: {
    //                     name: client.device.name,
    //                     hostname: client.device.hostname,
    //                     kernel: client.device.kernel,
    //                     cpu_num: client.device.cpu_num,
    //                     brand: client.device.brand,
    //                     frequency: client.device.frequency,
    //                     vendor: client.device.vendor,
    //                     memory: client.device.memory,
    //                     swap: client.device.swap,
    //                     version: client.device.version,
    //                     disk: {
    //                         updateMany: client.device.disk.map((disk) => ({
    //                             where: {
    //                                 client_id: client.clientId
    //                             },
    //                             data: {
    //                                 type: disk.disk_type,
    //                                 file_system: disk.file_system,
    //                                 total: disk.total_space,
    //                                 available: disk.available_space,
    //                                 removeable: disk.is_removable
    //                             }
    //                         }))
    //                     },
    //                     network: {
    //                         updateMany: client.device.network.map(
    //                             (network) => ({
    //                                 where: {
    //                                     client_id: client.clientId
    //                                 },
    //                                 data: {
    //                                     mac: network.mac,
    //                                     rx: network.rx,
    //                                     tx: network.tx
    //                                 }
    //                             })
    //                         )
    //                     }
    //                 }
    //             }
    //         }
    //     })
    //     return client_id
    // }
}
