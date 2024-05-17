import {candidatureService} from "../services/candidatureService.mjs"

export class candidatureController{
    static async new(req,res){
        try{
            const response = await candidatureService.new(req.body)
            res.status(200).json({message:"candidature created seccessfully"})
            
        }catch(error){
            if (error.status){
                res.status(error.status).json({message: error.message})
              }
              else{
                res.status(400).json({ message: error.message });
              }
        }
    }

    static async getCandidatures(req, res) {
        try {
            const { id } = req.params;
            const candidatures = await candidatureService.getCandidatures(id);
            res.status(200).json(candidatures);
        } catch (error) {
            if (error.status) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }
}