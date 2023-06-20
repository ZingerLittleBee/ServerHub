import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InfluxService } from '@/influx/influx.service';
import { PrismaService } from '@/db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(
    private readonly influxService: InfluxService,
    private readonly prismaService: PrismaService,
  ) {}

  registerClient(client: CreateClientDto) {}

  create(createClientDto: CreateClientDto) {
    const device = createClientDto.device;
    this.prismaService.client.create({
      data: {
        name: createClientDto.name,
        user: {
          connect: {
            userId: createClientDto.userId,
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
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
