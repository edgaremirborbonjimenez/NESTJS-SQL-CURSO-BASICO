import { Controller, Post, Body, Get,Param,ParseIntPipe,Delete, Patch} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateProfileDTO } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {

constructor(private usersService: UsersService){}

    @Get()
    async getUsers(){
        return await this.usersService.getUsers();
    }

    @Get('/:id')
    async getUser(@Param('id',ParseIntPipe) id:number){
        return await this.usersService.getUser(id);
    }

    @Post()
    async createUser(@Body() newUser:CreateUserDTO){
        try{
            return await this.usersService.createUser(newUser);
        }catch(err){
            return err;
        };
    }

    @Delete('/:id')
    async deleteUser(@Param('id',ParseIntPipe) id:number){
        return await this.usersService.deleteUser(id)
    }
    
    @Patch('/:id')
    async updateUser(@Param('id',ParseIntPipe) id:number,@Body() user:UpdateUserDTO){
       return await this.usersService.updateUser(id,user);
    }

    @Post(':id/profile')
    async createProfile(@Param('id',ParseIntPipe) id: number,@Body() profile: CreateProfileDTO){
        try{
            return await this.usersService.createProfile(id,profile);
        }catch(err){
            return err;
        };
    }
}
