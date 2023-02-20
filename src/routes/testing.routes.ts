import {Request, Response, Router} from "express"
import {blogsRepositoryDb} from "../repositories/blogs.repository.db";
import {postsRepositoryDb} from "../repositories/posts.repository.db";
export const h2TestingRouter = Router({})

h2TestingRouter.delete('/all-data',(req:Request, res:Response) =>
{
    blogsRepositoryDb.allDeletedBlogs()
    postsRepositoryDb.allDeletedPosts()

    res.sendStatus(204);
    return;
})