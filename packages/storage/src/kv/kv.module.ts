import { Module } from '@nestjs/common'
import { KvService } from './kv.service'
import { KvController } from './kv.controller'
import { DbModule } from '@/db/db.module'

@Module({
    imports: [DbModule],
    controllers: [KvController],
    providers: [KvService]
})
export class KvModule {}
