import { NestFactory } from '@nestjs/core'
import { ClientModule } from './client.module'
import { WsAdapter } from '@nestjs/platform-ws'
import * as cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'
import {
    defaultClientServicePort,
    kClientServicePort
} from '@server-octopus/shared'
import { Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
    const logger = new Logger('Bootstrap')
    const app = await NestFactory.create<NestExpressApplication>(ClientModule)
    app.useWebSocketAdapter(new WsAdapter(app))
    app.use(cookieParser())
    app.useBodyParser('json', { limit: '10mb' })

    const configService = app.get(ConfigService)
    const port =
        configService.get<number>(kClientServicePort) ??
        defaultClientServicePort

    logger.log(`Application is running on port: ${port}`)

    await app.listen(port)
}
bootstrap()
