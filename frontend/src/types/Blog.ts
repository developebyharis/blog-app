export interface BlogPost {
    id: string
    title: string
    content: string
    author: string
    createdAt: string
    updatedAt: string
}

export interface CreateBlogPost {
    title: string
    content: string
    author: string

}

export interface UpdateBlogPost {
    title?: string
    content?: string
    author?: string

}
