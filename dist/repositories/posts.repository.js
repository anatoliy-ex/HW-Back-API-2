"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const posts_db_1 = require("../dataBase/posts.db");
exports.postsRepository = {
    allPosts() {
        return posts_db_1.postsDB;
    },
    getPostByID(id) {
        return posts_db_1.postsDB.find(p => p.id === id);
    },
    createPost(post, blogName) {
        const newPost = {
            id: `${Date.now()}`,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blogName
        };
        posts_db_1.postsDB.push(newPost);
        return newPost;
    },
    updatePostByID(post, id) {
        const updatePost = posts_db_1.postsDB.find(p => p.id === id);
        if (updatePost) {
            updatePost.title = post.title;
            updatePost.shortDescription = post.shortDescription;
            updatePost.content = post.content;
            updatePost.blogId = post.blogId;
            return true;
        }
        else {
            return false;
        }
    },
    deletePostByID(id) {
        for (let i = 0; i < posts_db_1.postsDB.length; i++) {
            if (posts_db_1.postsDB[i].id === id) {
                posts_db_1.postsDB.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    allDeletedPosts() {
        posts_db_1.postsDB.splice(0, posts_db_1.postsDB.length);
        return posts_db_1.postsDB;
    }
};
