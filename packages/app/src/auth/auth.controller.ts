import {Body, Controller, Post, HttpCode, HttpStatus, Logger} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResultUtil, Result } from '@/utils/ResultUtil';
import { hash } from 'bcrypt';
import {Prisma} from "@prisma/client";
import {prismaErrorCodeExplain} from "@/utils/ErrorUtil";

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() signInDto: Record<string, any>): Promise<Result<{token: string}>> {
        try {
            const hashPass = await hash(signInDto.password, this.authService.getSaltRounds());
            await this.authService.register(hashPass,signInDto.email,signInDto.username);
            return ResultUtil.ok();
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                this.logger.error(`code: ${e.code}, name: ${e.name} ,message: ${e.message}, explanation: ${prismaErrorCodeExplain(e.code)})}`);
                return ResultUtil.error(prismaErrorCodeExplain(e.code));
            } else {
                this.logger.error(e.message);
                return ResultUtil.error('Register failed, please try again later');
            }

        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>): Promise<Result<{token: string}>> {
        try {
            const hashPass = await hash(signInDto.password, this.authService.getSaltRounds());
            const res = await this.authService.signIn(hashPass,signInDto.email,signInDto.username);
            return ResultUtil.ok({
                token: res.access_token,
            });
        } catch (e) {
            return ResultUtil.error(e.message);
        }
    }
}
