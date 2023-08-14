import { Module } from '@nestjs/common'
import { DeviceService } from './device.service'
import { DeviceController } from './device.controller'
import { NetworkController } from '@/device/network/network.controller'
import { NetworkService } from '@/device/network/network.service'
import { DiskController } from '@/device/disk/disk.controller'
import { DiskService } from '@/device/disk/disk.service'

@Module({
    controllers: [DeviceController, NetworkController, DiskController],
    providers: [DeviceService, NetworkService, DiskService]
})
export class DeviceModule {}
