import {Request, Response, Router} from "express"
import {postsRepositoryDb} from "../repositories/posts.repository.db";
import {blogsRepositoryDb} from "../repositories/blogs.repository.db";

export const h2PostsRouter = Router({})
import {inputValidationMiddleware, postValidationMiddleware} from "../middlewares/validator.middlewares"
import {BlogsType, PostsTypes} from "../types/types";

export const expressBasicAuth = require('express-basic-auth')
export const adminStatusAuth = expressBasicAuth({users: { 'admin': 'qwerty' }});

h2PostsRouter.get('/', async (req: Request, res: Response) =>
{
    const allPost = await postsRepositoryDb.allPosts()

    if(allPost)
    {
        res.status(200).send(allPost)
        return;
    }
    else
    {
        res.sendStatus(404);
        return;
    }

})

h2PostsRouter.get('/:id', async (req: Request, res: Response) =>
{
    const postWithID : PostsTypes | null = await postsRepositoryDb.getPostByID(req.params.id)

    if(postWithID)
    {
        res.status(200).send(postWithID);
        return;
    }
    else
    {
        res.sendStatus(404);
        return;
    }
})

h2PostsRouter.post('/', adminStatusAuth, postValidationMiddleware, inputValidationMiddleware, async (req: Request, res: Response) =>
{
    const foundBlog : BlogsType | null = await blogsRepositoryDb.getBlogByID(req.body.blogId);
    if (foundBlog === null) {
        res.sendStatus(404)
    } else {
        const blogName = foundBlog.name
        const newPost: PostsTypes = await postsRepositoryDb.createPost(req.body, blogName);
        res.status(201).send(newPost)
    }
})

h2PostsRouter.put('/:id', adminStatusAuth,  postValidationMiddleware, inputValidationMiddleware, async (req: Request, res: Response) =>
{
    const post = await postsRepositoryDb.getPostByID(req.params.id)
    if (!post) return  res.sendStatus(404);
    await postsRepositoryDb.updatePostByID(req.body, req.params.id)
    res.sendStatus(204);
})

h2PostsRouter.delete('/:id', adminStatusAuth, async (req: Request, res: Response) =>
{
    const isDeleted = await postsRepositoryDb.deletePostByID(req.params.id)

    if(isDeleted)
    {
        res.sendStatus(204);
    }
    else
    {
        res.sendStatus(404);
    }
})
