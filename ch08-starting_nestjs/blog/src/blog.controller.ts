import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog')
export class BlogController {
    // blogService: BlogService;

    // constructor() {
    //     this.blogService = new BlogService();
    // }

    constructor(private blogService : BlogService) {}

    @Get()
    getAllPosts() {
        console.log('Get all posts');
        return this.blogService.getAllPosts();
    }

    @Post()
    createPost(@Body() postDto) {
        console.log('Create a post');
        this.blogService.createPost(postDto);
        return 'Post created';
    }

    // @Get('/:id')
    // getPost(@Param('id') id: string) {
    //     console.log('Get post with id: ' + id);
    //     return this.blogService.getPost(id);
    // }

    @Get('/:id')
    async getPost(@Param('id') id: string) {
        console.log('Get a post');

        const post = await this.blogService.getPost(id);
        console.log(post);
        return post;
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        console.log('Delete post');
        this.blogService.delete(id);
        return 'success';
    }

    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDto) {
        console.log('Update post', id, postDto);
        return this.blogService.updatePost(id, postDto);
    }
}