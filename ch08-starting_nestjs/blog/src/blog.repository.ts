import { readFile, writeFile } from "fs/promises";
import { PostDto } from "./blog.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, BlogDocument } from "./blog.schema";

// Define BlogRepository interface
export interface BlogRepository {
    getAllPost() : Promise<PostDto[]>;
    createPost(postDto : PostDto);
    getPost(id: String) : Promise<PostDto>;
    delete(id: String);
    updatePost(id: String, postDto: PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = './src/blog.data.json';

    // Get all posts
    async getAllPost(): Promise<PostDto[]> {
        const datas = await readFile(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(datas);
        return posts;
    }

    // Create a post
    async createPost(postDto: PostDto) {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    // Get a post
    async getPost(id: String): Promise<PostDto> {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);
        return result;
    }

    // Delete a post
    async delete(id: String) {
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }

    // Update a post
    async updatePost(id: String, postDto: PostDto) {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = { id, ...postDto, updateDt: new Date() };
        posts[index] = updatePost;
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}
    
    async getAllPost(): Promise<PostDto[]> {
        return await this.blogModel.find().exec();
    }
    
    async createPost(postDto: PostDto) {
        const createPost = {
            ...postDto,
            createdDt: new Date(),
            updatedDt: new Date(),
        };
        this.blogModel.create(createPost);
    }
    
    async getPost(id: String): Promise<PostDto> {
        return await this.blogModel.findById(id);
    }
    
    async delete(id: String) {
        await this.blogModel.findByIdAndDelete(id);
    }
    
    async updatePost(id: String, postDto: PostDto) {
        const updatePost = { id, ...postDto, updatedDt: new Date() };
        await this.blogModel.findByIdAndUpdate(id, updatePost);
    }
}