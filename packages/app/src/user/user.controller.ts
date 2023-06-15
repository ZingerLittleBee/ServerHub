import {Controller, Post, Body} from '@nestjs/common';
import {UserService} from "@/user/user.service";
import {CreateUserDto} from "@/user/dto/create-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
