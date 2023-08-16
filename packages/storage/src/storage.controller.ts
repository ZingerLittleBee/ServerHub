import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { FusionDto } from '@server-octopus/types'
import { MongoService } from '@/db/mongo.service'
import {
    kFusionPersistentAddEvent,
    kFusionRealtimeAddEvent
} from '@server-octopus/shared'

@Controller()
export class StorageController {
    constructor(private readonly mongoService: MongoService) {}

    @EventPattern(kFusionPersistentAddEvent)
    async addPersistentFusion(fusion: FusionDto) {
        await this.mongoService.addPersistentFusion(fusion)
    }

    @EventPattern(kFusionRealtimeAddEvent)
    async addRealtimeFusion(fusion: FusionDto) {
        await this.mongoService.addRealtimeFusion(fusion)
    }
}
