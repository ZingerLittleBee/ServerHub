import { Injectable } from '@nestjs/common'
import { TokenService } from '@/token/token.service'
import { ClientPayload } from '@server-octopus/types'
import { SignType, TokenType } from '@/token/token.const'

@Injectable()
export class ClientService {
    constructor(private tokenService: TokenService) {}

    sign(payload: ClientPayload) {
        return this.tokenService.signGroup(payload, SignType.client)
    }

    verify(token: string) {
        return this.tokenService.verify(token, TokenType.clientAccess)
    }

    isTokenValid(token: string) {
        return this.tokenService.isTokenValid(token, TokenType.clientAccess)
    }
}
