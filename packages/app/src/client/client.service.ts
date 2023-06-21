import {Injectable, Logger} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InfluxService } from '@/influx/influx.service';
import { PrismaService } from '@/db/prisma.service';
import { Prisma } from '@prisma/client';
import {StatusEnum} from "@/enums/status.enum";

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    private readonly influxService: InfluxService,
    private readonly prismaService: PrismaService,
  ) {}

  async registerClient(client: CreateClientDto) {
    // if `clientId` not empty, already registered before.
    // just update `status` and `device` field, if it has.
    if (client.clientId) {
      this.logger.verbose(`clientId: ${client.clientId} already registered before`)
      const rawClient = await this.prismaService.client.findUnique({
        where: {
          client_id: client.clientId
        },
        include: {
          device: true
        }
      })
      this.logger.verbose(`clientId: ${client.clientId}, query client data: ${rawClient}`)
      if (rawClient) {
        let newClient: UpdateClientDto = {
          name: client.name ?? rawClient.name,
          userId: client.userId ?? rawClient.user_id,
        }
        if (client.device && rawClient.device) {
          let { id, created_at, updated_at, client_id, ...other } = rawClient.device
          newClient.device = { ...other, ...client.device }
        }
        this.logger.verbose(`clientId: ${newClient.clientId}, update client data: ${newClient}`)
        await this.update(newClient)
      } else {
        this.logger.error(`clientId: ${client.clientId} not found`)
        return false
      }
    } else {
      this.logger.verbose(`new client: ${client}`)
      await this.create(client)
    }
  }

  async update(newClient: UpdateClientDto) {
    return this.prismaService.client.update(
        {
          where: {
            client_id: newClient.clientId
          },
          data: {
            name: newClient.name,
            status: StatusEnum.ACTIVE,
            user: {
              connect: {
                user_id: newClient.userId
              }
            },
            device: {
              update: {
                ...newClient.device
              }
            }
          }
        }
    )
  }

  /**
   * @param createClientDto
   * @return ClientId, not db primary key
   */
  async create(createClientDto: CreateClientDto) {
    const device = createClientDto.device;
    const client = await this.prismaService.client.create({
      data: {
        name: createClientDto.name,
        status: StatusEnum.ACTIVE,
        user: {
          connect: {
            user_id: createClientDto.userId,
          },
        },
        device: {
          create: {
            hostname: device.hostname,
            kernel: device.kernel,
            cpu_num: device.cpu_num,
            brand: device.brand,
            frequency: device.frequency,
            vendor: device.vendor,
            memory: device.memory,
            swap: device.swap,
          },
        },
      } as Prisma.ClientCreateInput,
    });
    return client.client_id
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
