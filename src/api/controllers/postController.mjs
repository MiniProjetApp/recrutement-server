import Post from "../models/postModel.mjs"
import {PostService} from "../services/postService.mjs"

export class PostController{
    static async findAll(req,res){
        try{
            console.log("got here")
            
            const posts = await PostService.findAll()
            res.status(200).json(posts)
        }
        catch(error){
            console.log(error)
        }
    }
    static async create(req,res){
        try{
            const{postData,languageData,criteriaData}= req.body;
            console.log(criteriaData)
            const post = await PostService.create(postData,languageData,criteriaData)
            res.status(200).json({message:"successfully created post"})
        }
        catch(error){
            console.log(error)
        }
    }
    static async getPostInfo(req,res){
        try{
            const foundpost = await PostService.getPostInfo(req.params['id'])
            res.status(200).json(foundpost)
        }catch(error){
            if (error.status){
                res.status(error.status).json({message: error.message})
              }
              else{
                res.status(400).json({ message: error.message });
              }
        }
    }
}