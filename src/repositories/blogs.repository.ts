import {blogsDB} from "../dataBase/blogs.db";
import {BlogsType} from "../types/blogs.types";

export const blogsRepository =
{
    allBlogs()
    {
        return blogsDB;
    },

    getBlogByID(id : string)
    {
        return  blogsDB.find(b => b.id === id);
    },

    createBlog(blog : BlogsType)
    {
        const newBlog =
        {
            id: `${Date.now}`,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl
        }
        blogsDB.push(newBlog);
        return newBlog;
    },

    updateBlogByID(id : string, blog: BlogsType)
    {
        const updateBlog = blogsDB.find(b => b.id === id)

        if(updateBlog)
        {
            updateBlog.name = blog.name;
            updateBlog.description = blog.description;
            updateBlog.websiteUrl = blog.websiteUrl;
            return true;
        }
        else
        {
            return false;
        }
    },

    deleteBlogByID(id: string)
    {
        for(let i = 0; i < blogsDB.length; i++)
        {
            if(blogsDB[i].id === id)
            {
                blogsDB.splice(i,1);
                return true;
            }
        }
        return false;
    },

    allDeletedBlogs()
    {
        blogsDB.splice(0, blogsDB.length)
        return blogsDB;
    }
}