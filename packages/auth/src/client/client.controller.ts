import { Controller } from '@nestjs/common'
import { ClientService } from './client.service'
import { EventPattern, MessagePattern } from '@nestjs/microservices'
import {
    kClientDeleteEvent,
    kClientTokenSign,
    kClientTokenValid,
    kClientTokenVerify,
    ResultUtil
} from '@server-octopus/shared'
import {
    ClientPayload,
    ClientVerifyResult,
    Result,
    TokenPayload
} from '@server-octopus/types'

@Controller()
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @MessagePattern(kClientTokenSign)
    async sign(payload: ClientPayload): Promise<Result<string>> {
        try {
            const token = await this.clientService.sign(payload)
            return token
                ? ResultUtil.ok(token.accessToken)
                : ResultUtil.error('Client Sign Error')
        } catch (e) {
            return ResultUtil.error(e.message)
        }
    }

    @MessagePattern(kClientTokenVerify)
    async verify(data: { token: string }): Promise<ClientVerifyResult> {
        try {
            return ResultUtil.ok(await this.clientService.verify(data.token))
        } catch (e) {
            return ResultUtil.error(e.message)
        }
    }

    @MessagePattern(kClientTokenValid)
    async isTokenValid(data: { token: string }): Promise<Result<boolean>> {
        try {
            const res = await this.clientService.isTokenValid(data.token)
            return res ? ResultUtil.ok(res) : ResultUtil.error('Token Invalid')
        } catch (e) {
            return ResultUtil.error(e.message)
        }
    }

    @EventPattern(kClientDeleteEvent)
    async handleClientDelete(tokenPayload: TokenPayload) {
        await this.clientService.handleClientDelete(tokenPayload)
    }
}
