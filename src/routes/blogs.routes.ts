import {Request, Response, Router} from "express"
import {blogsRepository} from "../repositories/blogs.repository";
export const h2BlogsRouter = Router({})
import {inputValidationMiddleware, blogValidationMiddleware} from "../middlewares/validator.middlewares"

export const expressBasicAuth = require('express-basic-auth')
export const adminStatusAuth = expressBasicAuth({users: { 'admin': 'qwerty' }});

h2BlogsRouter.get('/', (req: Request, res: Response) =>
{
    const allBlogs = blogsRepository.allBlogs()
    if(allBlogs)
    {
        res.status(200).send(allBlogs);
        return;
    }
    res.sendStatus(404);
    return;
})

h2BlogsRouter.get('/:id', (req: Request, res: Response) =>
{
    const blogWithID = blogsRepository.getBlogByID(req.params.id)

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

h2BlogsRouter.post('/', inputValidationMiddleware, blogValidationMiddleware, adminStatusAuth, (req: Request, res: Response) =>
{
    const newBlog = blogsRepository.createBlog(req.body)

    res.status(201).send(newBlog);
    return;
})

h2BlogsRouter.put('/:id', adminStatusAuth, inputValidationMiddleware, blogValidationMiddleware, (req: Request, res: Response) =>
{
    const updateBlog = blogsRepository.updateBlogByID(req.params.id, req.body)
    if(updateBlog)
    {
        res.sendStatus(201)
    }
    else
    {
        res.send(404)
    }
})

h2BlogsRouter.delete('/:id', adminStatusAuth, (req: Request, res: Response) =>
{
    const isDeleted = blogsRepository.deleteBlogByID(req.params.id)

    if(isDeleted)
    {
        res.sendStatus(204);
    }
    else
    {
        res.sendStatus(404);
    }
})