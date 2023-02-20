"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.h2TestingRouter = void 0;
const express_1 = require("express");
const blogs_repository_db_1 = require("../repositories/blogs.repository.db");
const posts_repository_db_1 = require("../repositories/posts.repository.db");
exports.h2TestingRouter = (0, express_1.Router)({});
exports.h2TestingRouter.delete('/all-data', (req, res) => {
    blogs_repository_db_1.blogsRepositoryDb.allDeletedBlogs();
    posts_repository_db_1.postsRepositoryDb.allDeletedPosts();
    res.sendStatus(204);
    return;
});
