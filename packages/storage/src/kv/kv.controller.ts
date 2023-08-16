import { Controller } from '@nestjs/common'
import { KvService } from './kv.service'
import { EventPattern, MessagePattern } from '@nestjs/microservices'
import {
    kJwtCreatedEvent,
    kRedisEqualEvent,
    kRedisKeyRemove
} from '@server-octopus/shared'
import { EventJwtCreated, Result } from '@server-octopus/types'
import { ResultUtil } from '@/utils/result.util'
import { ErrorUtil } from '@/db/error.util'

@Controller()
export class KvController {
    constructor(
        private readonly kvService: KvService,
        private readonly errorUtil: ErrorUtil
    ) {}

    @EventPattern(kJwtCreatedEvent)
    async handleJwtCreated(data: EventJwtCreated) {
        await this.kvService.setWithExpire({ ...data })
    }

    @MessagePattern(kRedisEqualEvent)
    async equal(data: { key: string; value: any }): Promise<Result<boolean>> {
        try {
            const res = await this.kvService.equal(data.key, data.value)
            return ResultUtil.ok(res)
        } catch (e) {
            return ResultUtil.error(this.errorUtil.explain(e))
        }
    }

    @EventPattern(kRedisKeyRemove)
    async handleKeyRemove({ key }: { key: string }) {
        await this.kvService.remove(key)
    }
}
