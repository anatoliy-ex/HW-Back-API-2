"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStatusAuth = exports.expressBasicAuth = exports.h2PostsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts.repository");
const blogs_routes_1 = require("./blogs.routes");
const blogs_repository_1 = require("../repositories/blogs.repository");
exports.h2PostsRouter = (0, express_1.Router)({});
const validator_middlewares_1 = require("../middlewares/validator.middlewares");
exports.expressBasicAuth = require('express-basic-auth');
exports.adminStatusAuth = (0, exports.expressBasicAuth)({ users: { 'admin': 'qwerty' } });
exports.h2PostsRouter.get('/', (req, res) => {
    const allPost = posts_repository_1.postsRepository.allPosts();
    if (allPost) {
        res.status(200).send(allPost);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
});
exports.h2PostsRouter.get('/:id', (req, res) => {
    const postWithID = posts_repository_1.postsRepository.getPostByID(req.params.id);
    if (postWithID) {
        res.status(200).send(postWithID);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
});
blogs_routes_1.h2BlogsRouter.post('/', exports.adminStatusAuth, (req, res) => {
    const blog = blogs_repository_1.blogsRepository.getBlogByID(req.body.blogId);
    let newPost = posts_repository_1.postsRepository.createPost(req.body, blog.name);
    res.status(201).send(newPost);
    return;
});
blogs_routes_1.h2BlogsRouter.put('/', exports.adminStatusAuth, validator_middlewares_1.inputValidationMiddleware, validator_middlewares_1.postValidationMiddleware, (req, res) => {
    const updatePost = posts_repository_1.postsRepository.updatePostByID(req.body, req.params.id);
    if (updatePost) {
        res.sendStatus(201);
    }
    else {
        res.send(404);
    }
});
blogs_routes_1.h2BlogsRouter.delete('/', exports.adminStatusAuth, validator_middlewares_1.inputValidationMiddleware, validator_middlewares_1.postValidationMiddleware, (req, res) => {
    const isDeleted = posts_repository_1.postsRepository.deletePostByID(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
