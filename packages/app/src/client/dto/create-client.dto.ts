import {StatusEnum} from "@/enums/status.enum";

export class CreateClientDto {
    name: string
    status: StatusEnum
    device: CreateDeviceDto
    userId: string
}
