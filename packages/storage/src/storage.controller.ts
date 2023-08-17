import { EventPattern } from '@nestjs/microservices'
import { FusionDto } from '@server-octopus/types'
import { MongoService } from '@/db/mongo.service'
import { kFusionAddEvent } from '@server-octopus/shared'
import { Controller } from '@nestjs/common'

@Controller()
export class StorageController {
    constructor(private readonly mongoService: MongoService) {}

    @EventPattern(kFusionAddEvent)
    async addFusion(fusion: FusionDto) {
        await this.mongoService.addFusion(fusion)
    }
}
