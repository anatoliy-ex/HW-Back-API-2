import {Request, Response, Router} from "express"
import {postsRepository} from "../repositories/posts.repository";
import {h2BlogsRouter} from "./blogs.routes";
import {blogsRepository} from "../repositories/blogs.repository";
export const h2PostsRouter = Router({})
import {inputValidationMiddleware, postValidationMiddleware} from "../middlewares/validator.middlewares"

export const expressBasicAuth = require('express-basic-auth')
export const adminStatusAuth = expressBasicAuth({users: { 'admin': 'qwerty' }});

h2PostsRouter.get('/', (req: Request, res: Response) =>
{
    const allPost = postsRepository.allPosts()

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

h2PostsRouter.get('/:id', (req: Request, res: Response) =>
{
    const postWithID =  postsRepository.getPostByID(req.params.id)

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

h2PostsRouter.post('/', adminStatusAuth, postValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response) =>
{
    const blog = blogsRepository.getBlogByID(req.body.blogId)
    let newPost = postsRepository.createPost(req.body, blog!.name);

    res.status(201).send(newPost);
    return;
})

h2PostsRouter.put('/:id', adminStatusAuth,  postValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response) =>
{
    const updatePost = postsRepository.updatePostByID(req.body, req.params.id)

    if(updatePost)
    {
        res.sendStatus(204);
    }
    else
    {
        res.send(404);
    }
})

h2PostsRouter.delete('/:id', adminStatusAuth, (req: Request, res: Response) =>
{
    const isDeleted = postsRepository.deletePostByID(req.params.id)

    if(isDeleted)
    {
        res.sendStatus(204);
    }
    else
    {
        res.sendStatus(404);
    }
})
