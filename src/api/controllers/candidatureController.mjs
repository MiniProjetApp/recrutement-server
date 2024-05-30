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

    static async getCandidaturesByPostID(req, res) {
        try {
            const { postID } = req.params;
            const candidatures = await candidatureService.getCandidaturesByPostID(postID);
            res.status(200).json(candidatures);
        } catch (error) {
            if (error.status) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }

    static async deleteCandidatureByUserIDAndPostID(req, res) {
        try {
            const { userID, postID } = req.body;
            const deleted = await candidatureService.deleteCandidatureByUserIDAndPostID(userID, postID);
            if (deleted) {
                res.status(200).json({ message: "Candidature deleted successfully" });
            } else {
                res.status(404).json({ message: "Candidature not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}