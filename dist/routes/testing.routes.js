"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.h2TestingRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs.repository");
const posts_repository_1 = require("../repositories/posts.repository");
exports.h2TestingRouter = (0, express_1.Router)({});
exports.h2TestingRouter.delete('/all-data', (req, res) => {
    blogs_repository_1.blogsRepository.allDeletedBlogs();
    posts_repository_1.postsRepository.allDeletedPosts();
    res.sendStatus(204);
    return;
});
