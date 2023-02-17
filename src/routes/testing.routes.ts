import {Request, Response, Router} from "express"
import {blogsRepository} from "../repositories/blogs.repository";
import {postsRepositoryDb} from "../repositories/posts.repository.db";
export const h2TestingRouter = Router({})

h2TestingRouter.delete('/all-data',(req:Request, res:Response) =>
{
    blogsRepository.allDeletedBlogs()
    postsRepositoryDb.allDeletedPosts()

    res.sendStatus(204);
    return;
})