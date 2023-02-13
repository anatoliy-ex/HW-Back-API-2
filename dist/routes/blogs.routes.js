"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStatusAuth = exports.expressBasicAuth = exports.h2BlogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs.repository");
exports.h2BlogsRouter = (0, express_1.Router)({});
const validator_middlewares_1 = require("../middlewares/validator.middlewares");
exports.expressBasicAuth = require('express-basic-auth');
exports.adminStatusAuth = (0, exports.expressBasicAuth)({ users: { 'admin': 'qwerty' } });
exports.h2BlogsRouter.get('/', (req, res) => {
    const allBlogs = blogs_repository_1.blogsRepository.allBlogs();
    if (allBlogs) {
        res.status(200).send(allBlogs);
        return;
    }
    res.sendStatus(404);
    return;
});
exports.h2BlogsRouter.get('/:id', (req, res) => {
    const blogWithID = blogs_repository_1.blogsRepository.getBlogByID(req.params.id);
    if (blogWithID) {
        res.status(200).send(blogWithID);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
});
exports.h2BlogsRouter.post('/', validator_middlewares_1.inputValidationMiddleware, validator_middlewares_1.blogValidationMiddleware, exports.adminStatusAuth, (req, res) => {
    const newBlog = blogs_repository_1.blogsRepository.createBlog(req.body);
    res.status(201).send(newBlog);
    return;
});
exports.h2BlogsRouter.put('/:id', exports.adminStatusAuth, validator_middlewares_1.inputValidationMiddleware, validator_middlewares_1.blogValidationMiddleware, (req, res) => {
    const updateBlog = blogs_repository_1.blogsRepository.updateBlogByID(req.params.id, req.body);
    if (updateBlog) {
        res.sendStatus(201);
    }
    else {
        res.send(404);
    }
});
exports.h2BlogsRouter.delete('/:id', exports.adminStatusAuth, (req, res) => {
    const isDeleted = blogs_repository_1.blogsRepository.deleteBlogByID(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
