import {HttpStatus,HttpException, Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class PostsService {


constructor(
    private userService:UsersService,
    @InjectRepository(Post) private postRespository:Repository<Post>
    ){}

  async createPost(post:CreatePostDTO){

        const author = await this.userService.getUser(post.authorId);

    if(!author){
        return new HttpException('User not found',HttpStatus.NOT_FOUND);
    }

    const newPost = await this.postRespository.create(post);
    this.postRespository.save(newPost);
    return newPost;
    }
    getPosts(){
        return this.postRespository.find({
            relations: ['author']
        });
    }
}


