"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogs_routes_1 = require("./routes/blogs.routes");
const posts_routes_1 = require("./routes/posts.routes");
const testing_routes_1 = require("./routes/testing.routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.use("/blogs", blogs_routes_1.h2BlogsRouter);
app.use("/posts", posts_routes_1.h2PostsRouter);
app.use("testing/", testing_routes_1.h2TestingRouter);
app.listen(port, () => { console.log(`Example app listening on port ${port}`); });
