import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Logger,
    Param,
    Post,
    Request,
    UseGuards
} from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientRegisterGuard } from '@/guard/register.guard'
import {
    ClientPayload,
    ClientVo,
    CreateClientDto,
    CreateClientVo,
    CreateDevice,
    Result,
    TokenPayload
} from '@server-octopus/types'
import { ResultUtil } from '@server-octopus/shared'
import { VerifyTokenGuard } from '@/guard/verify.guard'
import { ExtraGuard } from '@/guard/extra.guard'
import { ClientDataGuard } from '@/guard/data.guard'
import { RawFusion } from '@/type'

@Controller('client')
export class ClientController {
    private readonly logger = new Logger(ClientController.name)

    constructor(private readonly clientService: ClientService) {}

    @UseGuards(VerifyTokenGuard)
    @Get()
    async getAll(): Promise<Result<ClientVo[]>> {
        try {
            const clients = await this.clientService.getAll()
            return ResultUtil.ok(clients)
        } catch (e) {
            this.logger.error(`Get all client error: ${e.message}`)
            return ResultUtil.error('Get all client error')
        }
    }

    @UseGuards(ExtraGuard)
    @Delete(':clientId')
    async delete(
        @Param('clientId') clientId: string,
        @Request()
        req: Request & TokenPayload
    ) {
        try {
            await this.clientService.delete({
                clientId,
                userId: req.userId
            })
            return ResultUtil.ok()
        } catch (e) {
            this.logger.error(
                `Delete clientId: ${clientId} error: ${e.message}`
            )
            return ResultUtil.error(e.message)
        }
    }

    @UseGuards(ClientRegisterGuard)
    @Post('register')
    async register(
        @Body() device: CreateDevice,
        @Request() req: Request & TokenPayload
    ): Promise<Result<{ token: string }>> {
        try {
            await this.clientService.registerClient({
                device: this.clientService.deviceToDto(device),
                clientId: req.clientId,
                userId: req.userId
            })
            return ResultUtil.ok()
        } catch (e) {
            return ResultUtil.error(e.message)
        }
    }

    @UseGuards(VerifyTokenGuard)
    @Get('verify')
    @HttpCode(200)
    async tokenValidCheck() {
        return ResultUtil.ok()
    }

    @UseGuards(ExtraGuard)
    @Post()
    async create(
        @Request() req: Request & TokenPayload,
        @Body() client: CreateClientDto
    ): Promise<Result<CreateClientVo>> {
        try {
            const clientVo = await this.clientService.create({
                ...client,
                userId: req.userId
            })
            if (!clientVo?.clientId)
                return ResultUtil.error('create client error')
            const token = await this.clientService.signToken(
                req.userId,
                clientVo?.clientId
            )
            return ResultUtil.ok({
                ...clientVo,
                token
            } as CreateClientVo)
        } catch (e) {
            this.logger.error(`create client: ${client}, error: ${e.message}`)
            return ResultUtil.error(e.message)
        }
    }

    /**
     * add fusion to persistent db
     */
    @UseGuards(ClientDataGuard)
    @Post('data')
    async data(
        @Request() req: Request & ClientPayload,
        @Body() { fusion, time }: RawFusion
    ) {
        try {
            await this.clientService.addPersistentData({
                overview: fusion.overview,
                os: fusion.os,
                realtime: fusion.realtime,
                fullProcess: fusion.full_process,
                clientId: req.clientId,
                time: time
            })
        } catch (e) {
            this.logger.error(
                `From clientId: ${req.clientId} add persistent data, error: ${e.message}`
            )
            return ResultUtil.error(e.message)
        }
    }
}
