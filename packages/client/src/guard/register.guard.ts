import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Logger
} from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import {
    extractAccessToken,
    kAuthService,
    kClientTokenVerify
} from '@server-octopus/shared'
import { ClientProxy } from '@nestjs/microservices'
import { ClientPayload, Result } from '@server-octopus/types'

@Injectable()
export class ClientRegisterGuard implements CanActivate {
    private logger = new Logger(ClientRegisterGuard.name)

    constructor(@Inject(kAuthService) private authClient: ClientProxy) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = extractAccessToken(request)
        if (!token) return false
        try {
            const { success, data } = await firstValueFrom(
                this.authClient.send<Result<ClientPayload>>(
                    kClientTokenVerify,
                    {
                        token
                    }
                )
            )
            if (success && data) {
                request['clientId'] = data.clientId
                request['userId'] = data.userId
            }
            return success
        } catch (e) {
            this.logger.error(`verify token: ${token} error: ${e.message}`)
            return false
        }
    }
}
