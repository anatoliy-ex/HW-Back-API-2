import {Request, Response, Router} from "express"
import {blogsRepository} from "../repositories/blogs.repository";
import {postsRepository} from "../repositories/posts.repository";
export const h2TestingRouter = Router({})

h2TestingRouter.delete('/all-data',(req:Request, res:Response) =>
{
    blogsRepository.allDeletedBlogs()
    postsRepository.allDeletedPosts()

    res.sendStatus(204);
    return;
})