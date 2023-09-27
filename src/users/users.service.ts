import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import {CreateUserDTO} from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>,
                @InjectRepository(Profile) private profileRepository: Repository<Profile>){}


    
   async createUser(user:CreateUserDTO){

      const userFounde =await this.userRepository.findOne({
        where:{
          username: user.username
        }
      });

      if(userFounde){
        return new HttpException('User already exist',HttpStatus.CONFLICT);
      }

     const newUser =   this.userRepository.create(user);   
       return this.userRepository.save(newUser);  //En la clase que lo implementa manejaremos el async
    }

    getUsers(){
     return this.userRepository.find({
      relations: ['profile','post'] //Para que al consultar muestra el contenido de el la tabla relacionada
     });      
    }

    async getUser(id: number){
     const userFound = await this.userRepository.findOne({
        where: {
          id
        },
        relations: ['profile','post']
      });

      if(!userFound){
        return new HttpException('User not found',HttpStatus.NOT_FOUND);
      }

      return userFound;

    }

    async deleteUser(id:number){


     const res = await this.userRepository.delete({
        id
      });

      if(res.affected === 0){
        return new HttpException('User not found',HttpStatus.NOT_FOUND);

      }
      return res;
    }

    async updateUser(id:number, updatedUserDTO:UpdateUserDTO){

      const userFound = await this.userRepository.findOne({
        where: {
          id
        }
      });

      if(!userFound){
        return new HttpException('User not found',HttpStatus.NOT_FOUND);
      }

      //this.userRepository.update({id},updatedUser); //Opcion 1
      const updatedUser = Object.assign(userFound,updatedUserDTO);
      this.userRepository.save(updatedUser);
    }

    async createProfile(id:number,profile:CreateProfileDTO){

      const userFound = await this.userRepository.findOne({
        where: {
          id
        }
      });

      if(!userFound){
        return new HttpException('User not found',HttpStatus.NOT_FOUND);
      }

      const newProfile = await this.profileRepository.create(profile);
      const saveProfile = await this.profileRepository.save(newProfile);
      userFound.profile = saveProfile;
      return this.userRepository.save(userFound);

    }
}
