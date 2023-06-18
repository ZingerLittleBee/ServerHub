import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResultUtil, Result } from '@/utils/ResultUtil';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>): Promise<Result<{token: string}>> {
        console.log('signInDto', signInDto)
        try {
            const res = await this.authService.signIn(signInDto.username, signInDto.password);
            return ResultUtil.ok({
                token: res.access_token,
            });
        } catch (e) {
            console.log('e', e.message)
            return ResultUtil.error(e.message);
        }
    }
}
