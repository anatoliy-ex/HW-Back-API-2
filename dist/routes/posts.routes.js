"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStatusAuth = exports.expressBasicAuth = exports.h2PostsRouter = void 0;
const express_1 = require("express");
const posts_repository_db_1 = require("../repositories/posts.repository.db");
const blogs_repository_db_1 = require("../repositories/blogs.repository.db");
exports.h2PostsRouter = (0, express_1.Router)({});
const validator_middlewares_1 = require("../middlewares/validator.middlewares");
exports.expressBasicAuth = require('express-basic-auth');
exports.adminStatusAuth = (0, exports.expressBasicAuth)({ users: { 'admin': 'qwerty' } });
exports.h2PostsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPost = yield posts_repository_db_1.postsRepositoryDb.allPosts();
    if (allPost) {
        res.status(200).send(allPost);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
exports.h2PostsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postWithID = yield posts_repository_db_1.postsRepositoryDb.getPostByID(req.params.id);
    if (postWithID) {
        res.status(200).send(postWithID);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
exports.h2PostsRouter.post('/', exports.adminStatusAuth, validator_middlewares_1.postValidationMiddleware, validator_middlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blogs_repository_db_1.blogsRepositoryDb.getBlogByID(req.body.blogId);
    if (foundBlog === null) {
        res.sendStatus(404);
    }
    else {
        const blogName = foundBlog.name;
        const newPost = yield posts_repository_db_1.postsRepositoryDb.createPost(req.body, blogName);
        res.status(201).send(newPost);
    }
}));
exports.h2PostsRouter.put('/:id', exports.adminStatusAuth, validator_middlewares_1.postValidationMiddleware, validator_middlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatePost = yield posts_repository_db_1.postsRepositoryDb.updatePostByID(req.body, req.params.id);
    if (updatePost) {
        res.sendStatus(204);
    }
    else {
        res.send(404);
    }
}));
exports.h2PostsRouter.delete('/:id', exports.adminStatusAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_repository_db_1.postsRepositoryDb.deletePostByID(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
