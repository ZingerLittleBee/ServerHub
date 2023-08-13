import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException
} from '@nestjs/common'
import {
    extractAccessToken,
    kAuthService,
    kClientTokenVerify
} from '@server-octopus/shared'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { ClientPayload, Result } from '@server-octopus/types'

@Injectable()
export class ClientDataGuard implements CanActivate {
    private logger = new Logger(ClientDataGuard.name)

    constructor(@Inject(kAuthService) private authService: ClientProxy) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = extractAccessToken(request)
        if (!token) {
            this.logger.warn(`From ${request.ip} request, token not found`)
            throw new UnauthorizedException(`token not found`)
        }
        try {
            const { success, message, data } = await firstValueFrom(
                this.authService.send<Result<ClientPayload>>(
                    kClientTokenVerify,
                    {
                        token
                    }
                )
            )
            if (!success || !data?.clientId) {
                this.logger.error(
                    `Token: ${token} verify failed error: ${message}`
                )
                return false
            }
            request['clientId'] = data.clientId
            this.logger.verbose(
                `token: ${token} verify success, clientId: ${data.clientId}`
            )
        } catch (e) {
            this.logger.error(
                `From ip: ${request.ip} token: ${token} verify failed, error: ${e}`
            )
            throw new UnauthorizedException(e)
        }
        return true
    }
}
