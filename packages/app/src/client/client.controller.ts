import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import {Result, ResultUtil} from '@/utils/ResultUtil';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('register')
  async register(@Body() createClientDto: CreateClientDto): Promise<Result<{token?: string}>> {
    return this.clientService.registerClient(createClientDto);
  }

  // add data to influxdb
  @Post('data')
  async data(@Body() data: any) {

  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
