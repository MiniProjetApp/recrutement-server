import Post from "../models/postModel.mjs"
import {PostService} from "../services/postService.mjs"

export class PostController{
    static async findAll(req,res){
        try{
            console.log("got here")
            
            console.log(postData)
            const posts = await PostService.findAll()
            res.status(200).json(posts)
        }
        catch(error){
            console.log(error)
        }
    }
    static async create(req,res){
        try{

            console.log("got here")
            const postData = req.body;
            const post = await PostService.create(postData)
            res.status(200).json({message:"successfully created post"})
        }
        catch(error){
            console.log(error)
        }
    }
}