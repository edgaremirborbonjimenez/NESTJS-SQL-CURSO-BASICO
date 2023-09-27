import { Controller,Post,Body,Get } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private postService:PostsService){}

    @Post()
   async createPost(@Body()post:CreatePostDTO){
        return await this.postService.createPost(post);
    }

    @Get()
    async getPosts(){
        return await this.postService.getPosts();
    }
}
