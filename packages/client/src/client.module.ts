import { Module } from '@nestjs/common'

import {
    defaultNatsServerUrl,
    kAuthService,
    kNatsServerUrl,
    kStorageService
} from '@server-octopus/shared'
import { ClientController } from '@/client.controller'
import { ClientService } from '@/client.service'
import { EventsGateway } from '@/gateway/events.gateway'
import { EventsService } from '@/gateway/events.service'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    controllers: [ClientController],
    providers: [
        ClientService,
        EventsGateway,
        EventsService,
        {
            provide: kAuthService,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ClientProxyFactory.create({
                    transport: Transport.NATS,
                    options: {
                        servers:
                            configService.get<string>(kNatsServerUrl) ??
                            defaultNatsServerUrl
                    }
                })
        },
        {
            provide: kStorageService,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ClientProxyFactory.create({
                    transport: Transport.NATS,
                    options: {
                        servers:
                            configService.get<string>(kNatsServerUrl) ??
                            defaultNatsServerUrl
                    }
                })
        }
    ]
})
export class ClientModule {}
