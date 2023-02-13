import {postsDB} from "../dataBase/posts.db";
import {PostsTypes} from "../types/posts.types";
import {blogsDB} from "../dataBase/blogs.db";

export const postsRepository =
{
    allPosts()
    {
        return postsDB;
    },

    getPostByID(id: string)
    {
        return postsDB.find(p => p.id === id);
    },

    createPost(post: PostsTypes, blogName: string)
    {
        const newPost =
        {
            id:" " +new Date(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId : post.blogId,
            blogName: blogName
        }

        postsDB.push(newPost);
        return newPost;
    },

    updatePostByID(post: PostsTypes, id: string)
    {
        const updatePost = postsDB.find( p => p.id === id)

        if(updatePost)
        {
            updatePost.title= post.title;
            updatePost.shortDescription= post.shortDescription;
            updatePost.content= post.content;
            updatePost.blogId= post.blogId;
            return true;
        }
        else
        {
            return false;
        }
    },

    deletePostByID(id: string)
    {
        for(let i = 0; i < postsDB.length; i++)
        {
            if(postsDB[i].id === id)
            {
                postsDB.splice(i,1);
                return true;
            }
        }
        return false;
    },

    allDeletedPosts()
    {
        postsDB.splice(0, postsDB.length)
        return postsDB;
    }
}