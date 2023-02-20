import {Request, Response, Router} from "express"
import {blogsRepositoryDb} from "../repositories/blogs.repository.db";
export const h2BlogsRouter = Router({})
import {inputValidationMiddleware, blogValidationMiddleware} from "../middlewares/validator.middlewares"
import {BlogsType} from "../types/types";

export const expressBasicAuth = require('express-basic-auth')
export const adminStatusAuth = expressBasicAuth({users: { 'admin': 'qwerty' }});

h2BlogsRouter.get('/', async (req: Request, res: Response) =>
{
    let allBlogs = await blogsRepositoryDb.allBlogs();
    res.status(200).send(allBlogs);
    return;
})

h2BlogsRouter.get('/:id', async (req: Request, res: Response) =>
{
    const blogWithID = await blogsRepositoryDb.getBlogByID(req.params.id)

    if(blogWithID)
    {
        res.status(200).send(blogWithID);
        return;
    }
    else
    {
        res.sendStatus(404);
        return;
    }
})

h2BlogsRouter.post('/', adminStatusAuth, blogValidationMiddleware, inputValidationMiddleware ,async (req: Request, res: Response) =>
{
    const newBlogPromise : Promise<BlogsType> = blogsRepositoryDb.createBlog(req.body);
    const newBlog : BlogsType = await newBlogPromise
    res.status(201).send(newBlog);
    return
})

h2BlogsRouter.put('/:id', adminStatusAuth, blogValidationMiddleware, inputValidationMiddleware, async (req: Request, res: Response) =>
{
    const updateBlog = await blogsRepositoryDb.updateBlogByID(req.params.id, req.body)
    if(updateBlog)
    {
        res.sendStatus(204)
    }
    else
    {
        res.sendStatus(404)
    }
})

h2BlogsRouter.delete('/:id', adminStatusAuth, async (req: Request, res: Response) =>
{
    const isDeleted = await blogsRepositoryDb.deleteBlogByID(req.params.id)

    if(isDeleted)
    {
        res.sendStatus(204);
        return;
    }
    else
    {
        res.sendStatus(404);
        return;
    }
})