import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FusionModel } from '@/db/schemas/fusion.schema'
import { FusionDto } from '@server-octopus/types'
import { kPersistentFusion, kRealtimeFusion } from '@/db/const'

@Injectable()
export class MongoService {
    constructor(
        @InjectModel(kPersistentFusion)
        private persistentFusion: Model<FusionModel>,
        @InjectModel(kRealtimeFusion) private realtimeFusion: Model<FusionModel>
    ) {}

    async addPersistentFusion(fusion: FusionDto) {
        const createdFusion = new this.persistentFusion(fusion)
        return createdFusion.save()
    }

    async addRealtimeFusion(fusion: FusionDto) {
        const createdFusion = new this.realtimeFusion(fusion)
        return createdFusion.save()
    }

    async deleteFusionByClientId(clientId: string) {
        await this.persistentFusion.deleteMany({ clientId: clientId })
    }
}
