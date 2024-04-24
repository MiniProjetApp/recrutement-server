import Post from "../models/postModel.mjs"
import {PostService} from "../services/postService.mjs"

export class PostController{
    static async findAll(req,res){
        try{
            console.log("got here")
            const postData = req.body;
            console.log(postData)
            const posts = await PostService.findAll()
            res.status(200).json(posts)
        }
        catch(error){
            console.log(error)
        }
    }
}