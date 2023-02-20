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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogs_routes_1 = require("./routes/blogs.routes");
const posts_routes_1 = require("./routes/posts.routes");
const testing_routes_1 = require("./routes/testing.routes");
const db_1 = require("./dataBase/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.use("/blogs", blogs_routes_1.h2BlogsRouter);
app.use("/posts", posts_routes_1.h2PostsRouter);
app.use("/testing", testing_routes_1.h2TestingRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
