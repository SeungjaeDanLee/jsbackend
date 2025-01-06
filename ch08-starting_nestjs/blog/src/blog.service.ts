import { Injectable } from "@nestjs/common";
import { PostDto } from "./blog.model";
import { BlogMongoRepository } from "./blog.repository";
// import { BlogFileRepository, BlogRepository } from "./blog.repository";

// Before using BlogRepository
// export class BlogService {
//     posts = [];

//     getAllPosts() {
//         return this.posts;
//     }

//     createPost(postDto: PostDto) {
//         const id = this.posts.length + 1;
//         this.posts.push({ id: id.toString(), ...postDto, createdDt: new Date() });
//     }

//     getPost(id) {
//         const post = this.posts.find((post) => {
//             return post.id === id;
//         });
//         console.log(post);
//         return post;
//     }

//     delete(id) {
//         const filteredPosts = this.posts.filter((post) => post.id !== id);
//         this.posts = [...filteredPosts];
//     }

//     updatePost(id, postDto: PostDto) {
//         let updateIndex = this.posts.findIndex((post) => post.id === id);
//         const updatePost = { id, ...postDto, updatedDt: new Date() };
//         this.posts[updateIndex] = updatePost;
//         return updatePost;
//     }
// }

// Using BlogRepository
@Injectable()
export class BlogService {
    // blogRepository : BlogRepository;

    // constructor() {
    //     this.blogRepository = new BlogFileRepository();
    // }

    // constructor(private blogRepository: BlogFileRepository) {}
    constructor(private blogRepository: BlogMongoRepository) {}

    // Get all posts
    async getAllPosts() {
        return await this.blogRepository.getAllPost();
    }

    // Create a post
    createPost(postDto: PostDto) {
        this.blogRepository.createPost(postDto);
    }

    // Get a post
    async getPost(id) : Promise<PostDto> {
        return await this.blogRepository.getPost(id);
    }

    // Delete a post
    delete(id) {
        this.blogRepository.delete(id);
    }

    // Update a post
    updatePost(id, postDto: PostDto) {
        this.blogRepository.updatePost(id, postDto);
    }
}