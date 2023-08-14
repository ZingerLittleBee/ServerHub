import { Controller, Get, Param } from '@nestjs/common'
import { DiskDetailVo, Result } from '@server-octopus/types'
import { ResultUtil } from '@server-octopus/shared'
import { DiskService } from '@/device/disk/disk.service'

@Controller('device/network')
export class DiskController {
    constructor(private service: DiskService) {}

    @Get(':clientId')
    async queryByClientId(
        @Param('clientId') clientId: string
    ): Promise<Result<DiskDetailVo[]>> {
        try {
            return ResultUtil.ok(await this.service.queryByClientId(clientId))
        } catch (e) {
            return ResultUtil.error(e.message)
        }
    }
}
