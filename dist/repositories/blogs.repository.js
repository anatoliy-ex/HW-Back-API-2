"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const blogs_db_1 = require("../dataBase/blogs.db");
exports.blogsRepository = {
    allBlogs() {
        return blogs_db_1.blogsDB;
    },
    getBlogByID(id) {
        return blogs_db_1.blogsDB.find(b => b.id === id);
    },
    createBlog(blog) {
        const newBlog = {
            id: `${Date.now()}`,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        };
        blogs_db_1.blogsDB.push(newBlog);
        return newBlog;
    },
    updateBlogByID(id, blog) {
        const updateBlog = blogs_db_1.blogsDB.find(b => b.id === id);
        if (updateBlog) {
            updateBlog.name = blog.name;
            updateBlog.description = blog.description;
            updateBlog.websiteUrl = blog.websiteUrl;
            return true;
        }
        else {
            return false;
        }
    },
    deleteBlogByID(id) {
        for (let i = 0; i < blogs_db_1.blogsDB.length; i++) {
            if (blogs_db_1.blogsDB[i].id === id) {
                blogs_db_1.blogsDB.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    allDeletedBlogs() {
        blogs_db_1.blogsDB.splice(0, blogs_db_1.blogsDB.length);
        return blogs_db_1.blogsDB;
    }
};
