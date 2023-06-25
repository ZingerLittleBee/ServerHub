import {CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ClientAuthGuard implements CanActivate {
    private logger = new Logger(ClientAuthGuard.name);

    constructor(private jwtService: JwtService, private reflector: Reflector,  private configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.error(`token not found`)
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync<{
                clientId: string;
                iat: number;
                exp: number;
            }>(token, {
                secret: this.configService.get<string>('JWT_CLIENT_ACCESS_SECRET'),
            });
            request['clientId'] = payload.clientId;
            this.logger.verbose(`token: ${token} verify success, clientId: ${payload.clientId}`)
        } catch {
            this.logger.error(`token: ${token} verify failed`)
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
