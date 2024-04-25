import {userService} from "../services/userService.mjs"

export class userController{
    static async getCandidateInfo(req,res){
        try{
            const userData = await userService.getCandidateInfo(req.params['id'])
            res.status(200).json(userData)
            console.log(userData)
        }
        catch(error){
            if (error.status){
                res.status(error.status).json({message: error.message})
              }
              else{
                res.status(400).json({ message: error.message });
              }
        }
    }
    static async getEntrepriseInfo(req,res){
        try{
            const userData = await userService.getEntrepriseInfo(req.params['id'])
            res.status(200).json(userData)
            console.log(userData)
        }
        catch(error){
            if (error.status){
                res.status(error.status).json({message: error.message})
              }
              else{
                res.status(400).json({ message: error.message });
              }
        }
    }
    static async searchCandidate(req,res){
        console.log(req.query)
        try{
            const searchResult = await userService.searchCandidates(req.query)
            res.status(200).json(searchResult)
            console.log(searchResult)
        }
        catch(error){
            if (error.status){
                res.status(error.status).json({message: error.message})
              }
              else{
                res.status(400).json({ message: error.message });
              }
        }
    }
    static async searchEntreprise(req,res){
        console.log(req.query)
        try{
            const searchResult = await userService.searchEntreprise(req.query)
            res.status(200).json(searchResult)
            console.log(searchResult)
        }
        catch(error){
            if (error.status){
                res.status(error.status).json({message: error.message})
              }
              else{
                res.status(400).json({ message: error.message });
              }
        }
    }
    
}