import { Controller, Post } from "@nestjs/common";

@Controller('api/user/')
export class UserController {
    constructor(private commandBus, private queryBus) { }

    @Post()
    async createUser(createUserDto: CreateUserDto) {
        // to do
    }
}