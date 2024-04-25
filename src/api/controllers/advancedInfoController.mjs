import {advancedInfoService} from "../services/advancedInfoService.mjs"

export class advancedInfoController{
    static async createFormation(req,res){
        try{
            const formation = await advancedInfoService.createFormation(req.body);
            res.status(200).json({message:"formation created successfully"})
        }catch(error){
            console.log(error)
        }
    }
    static async deleteFormation(req,res){
        try{
            const formation = await advancedInfoService.deleteFormation(req.params['ID']);
            res.status(200).json({message:"formation deleted successfully"})
        }catch(error){
            console.log(error)
            res.status(400).json({message: error.message})
        }
    }
    static async getAllFormations(req,res){
        try{
            const formations = await advancedInfoService.getAllFormations(req.params['userid']);
            res.status(200).json(formations)
        }catch(error){
            console.log(error)
        }
    }

    static async createEducation(req, res) {
        try {
            const education = await advancedInfoService.createEducation(req.body);
            res.status(200).json({ message: "Education created successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteEducation(req, res) {
        try {
            const education = await advancedInfoService.deleteEducation(req.params.ID);
            res.status(200).json({ message: "Education deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllEducation(req, res) {
        try {
            const educations = await advancedInfoService.getAllEducations(req.params.userID);
            res.status(200).json(educations);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async createExperience(req, res) {
        try {
            const pastExperience = await advancedInfoService.createPastExperience(req.body);
            res.status(200).json({ message: "Past experience created successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteExperience(req, res) {
        try {
            const pastExperience = await advancedInfoService.deletePastExperience(req.params.ID);
            res.status(200).json({ message: "Past experience deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllExperiences(req, res) {
        try {
            const pastExperiences = await advancedInfoService.getAllPastExperiences(req.params.userID);
            res.status(200).json(pastExperiences);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }
}