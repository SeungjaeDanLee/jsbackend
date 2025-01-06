import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://<ID>:<PASSWORD>@cluster0.u6tys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
