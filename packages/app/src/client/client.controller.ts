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
  async register(@Body() createClientDto: CreateClientDto): Promise<Result<any>> {
    const res = await this.clientService.registerClient(createClientDto);
    return res
      ? ResultUtil.ok()
      : ResultUtil.error(
          'Register client failed, Please check your config in .env file.',
        );
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
