import {blogsCollection} from "../dataBase/db";
import {BlogsType} from "../types/types";

export const blogsRepositoryDb =
    {
        async allBlogs() : Promise<BlogsType[]>
        {
            return blogsCollection.find({}, {projection: {_id: 0}}).toArray()
        },

        async getBlogByID(id : string) : Promise <BlogsType | null>
        {
            return await blogsCollection.findOne({id: id}, {projection: {_id: 0}})
        },

        async createBlog(blog : BlogsType) : Promise<BlogsType>
        {
            const newBlog = {
                id:`${Date.now()}`,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            }
            await blogsCollection.insertOne(newBlog)
            return newBlog
        },

        async updateBlogByID(id : string, blog: BlogsType): Promise <boolean>
        {
            const result = await blogsCollection.updateOne({id: id}, { $set:
                    {
                        name : blog.name,
                        description : blog.description,
                        websiteUrl : blog.websiteUrl,
                    }
            })
            return result.matchedCount === 1
        },

        async deleteBlogByID(id: string) : Promise <boolean>
        {
            const result = await blogsCollection.deleteOne({id: id})
            return result.deletedCount === 1
        },

        async allDeletedBlogs()
        {
            await blogsCollection.deleteMany({})
            return []
        }
    }