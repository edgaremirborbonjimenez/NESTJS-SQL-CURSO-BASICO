import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TypeOrmModule} from '@nestjs/typeorm'
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'bone770115',
    database: 'nestdb',
    entities: [ __dirname + '/**/*.entity{.ts,.js}'],//Busca los archivos que tengan teminacion entity.ts o .js
    synchronize: true
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
