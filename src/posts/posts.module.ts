import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports:[TypeOrmModule.forFeature([Post]),UsersModule],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {}
