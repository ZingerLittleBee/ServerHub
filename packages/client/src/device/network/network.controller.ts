import { Controller, Get, Param } from '@nestjs/common'
import { NetworkService } from '@/device/network/network.service'
import { NetworkInfoVo, Result } from '@server-octopus/types'
import { ResultUtil } from '@server-octopus/shared'

@Controller('device/network')
export class NetworkController {
    constructor(private service: NetworkService) {}

    @Get(':clientId')
    async queryByClientId(
        @Param('clientId') clientId: string
    ): Promise<Result<NetworkInfoVo[]>> {
        try {
            return ResultUtil.ok(await this.service.queryByClientId(clientId))
        } catch (e) {
            return ResultUtil.error(e.message)
        }
    }
}
