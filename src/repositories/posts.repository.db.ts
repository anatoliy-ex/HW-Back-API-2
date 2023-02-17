import {blogsCollection, postsCollection} from "../dataBase/db";
import {BlogsType, PostsTypes} from "../types/types";

export const postsRepositoryDb =
{
    async allPosts() : Promise<PostsTypes[]>
    {
        return postsCollection.find({}, {projection: {_id: 0}}).toArray()
    },

    async getPostByID(id: string) : Promise <PostsTypes | null>
    {
        return await postsCollection.findOne({id: id}, {projection: {_id: 0}})
    },

    async createPost(post: PostsTypes, blogName: string) : Promise<PostsTypes>
    {
        const newPost = {
            id:`${Date.now()}`,
            title : post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blogName,
            createdAt : new Date().toISOString()
        }
        await postsCollection.insertOne(newPost)
        return newPost
    },

    async updatePostByID(post: PostsTypes, id: string) : Promise<boolean>
    {
        const result = await blogsCollection.updateOne({id: id}, { $set:
                {
                    title : post.title,
                    shortDescription : post.shortDescription,
                    content : post.content,
                    blogId : post.blogId
                }
        })
        return result.matchedCount === 1
    },

    async deletePostByID(id: string) : Promise<boolean>
    {
        const result = await postsCollection.deleteOne({id: id});
        return result.deletedCount === 1;
    },

    async allDeletedPosts()
    {
        await postsCollection.deleteMany({})
        return []
    }
}