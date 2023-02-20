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
exports.adminStatusAuth = exports.expressBasicAuth = exports.h2BlogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_db_1 = require("../repositories/blogs.repository.db");
exports.h2BlogsRouter = (0, express_1.Router)({});
const validator_middlewares_1 = require("../middlewares/validator.middlewares");
exports.expressBasicAuth = require('express-basic-auth');
exports.adminStatusAuth = (0, exports.expressBasicAuth)({ users: { 'admin': 'qwerty' } });
exports.h2BlogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allBlogs = yield blogs_repository_db_1.blogsRepositoryDb.allBlogs();
    res.status(200).send(allBlogs);
    return;
}));
exports.h2BlogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogWithID = yield blogs_repository_db_1.blogsRepositoryDb.getBlogByID(req.params.id);
    if (blogWithID) {
        res.status(200).send(blogWithID);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
exports.h2BlogsRouter.post('/', exports.adminStatusAuth, validator_middlewares_1.blogValidationMiddleware, validator_middlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlogPromise = blogs_repository_db_1.blogsRepositoryDb.createBlog(req.body);
    const newBlog = yield newBlogPromise;
    res.status(201).send(newBlog);
    return;
}));
exports.h2BlogsRouter.put('/:id', exports.adminStatusAuth, validator_middlewares_1.blogValidationMiddleware, validator_middlewares_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBlog = yield blogs_repository_db_1.blogsRepositoryDb.updateBlogByID(req.params.id, req.body);
    if (updateBlog) {
        res.sendStatus(204);
    }
    else {
        res.send(404);
    }
}));
exports.h2BlogsRouter.delete('/:id', exports.adminStatusAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_repository_db_1.blogsRepositoryDb.deleteBlogByID(req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}));
