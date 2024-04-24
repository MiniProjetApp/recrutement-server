import Post from "../models/postModel.mjs"

export class PostService{
    static async findAll(){
        try{
        const posts = await Post.findAll()
        return posts}
        catch(error){
            console.log(error)
        }
    }
    static async create(){
        const post = await Post.create(postData)
        return post
    } 
}
