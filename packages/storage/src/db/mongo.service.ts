import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FusionModel } from '@/db/schemas/fusion.schema'
import { FusionDto } from '@server-octopus/types'

@Injectable()
export class MongoService {
    constructor(
        @InjectModel(FusionModel.name) private fusion: Model<FusionModel>
    ) {}

    async addFusion(fusion: FusionDto) {
        const createdFusion = new this.fusion(fusion)
        return createdFusion.save()
    }

    async deleteFusionByClientId(clientId: string) {
        await this.fusion.deleteMany({ clientId: clientId })
    }
}
