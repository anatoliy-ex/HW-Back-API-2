export type BlogsType =
    {
        id: string,
        name: string,
        description: string,
        websiteUrl: string,
        createdAt : string,
        isMembership: boolean
    };
export type PostsTypes =
    {
        id: string,
        title: string,
        shortDescription: string,
        content: string,
        blogId : string,
        blogName: string,
        createdAt : string,
    };