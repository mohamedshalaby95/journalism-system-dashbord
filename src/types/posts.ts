export interface IPost{
    status: string,
    _id: string,
    title: string,
    description: string,
    image: string,
    category: string,
    subCategory: string,
    likes: [string],
    auther: string,
    regien: string,
    comments: [string],
}