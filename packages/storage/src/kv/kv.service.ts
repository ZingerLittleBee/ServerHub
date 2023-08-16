import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable, Logger } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class KvService {
    private logger = new Logger(KvService.name)

    constructor(@InjectRedis() private readonly redis: Redis) {}

    async setWithExpire(data: { key: string; value: any; expire: number }) {
        return this.redis.set(data.key, data.value, 'EX', data.expire)
    }

    async equal(key: string, value: any) {
        try {
            const res = await this.redis.get(key)
            return res === value
        } catch (e) {
            this.logger.error(`Get from redis error: ${e.message}`)
            return false
        }
    }

    async exists(key: string) {
        try {
            const res = await this.redis.exists(key)
            return res === 1
        } catch (e) {
            this.logger.error(`Get from redis error: ${e.message}`)
            return false
        }
    }

    async remove(key: string) {
        try {
            await this.redis.del(key)
        } catch (e) {
            this.logger.error(`Remove key: ${key} error: ${e.message}`)
        }
    }
}
