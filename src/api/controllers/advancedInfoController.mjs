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

    static async getHighestEducation(req, res) {
        const { userID, fieldID } = req.query;
      
        try {
          const highestEducation = await EducationService.getHighestEducation(userID, fieldID);
          res.json(highestEducation);
        } catch (error) {
          console.error("Error while fetching highest education:", error);
          res.status(500).json({ error: "Internal server error" });
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

    static async updateLanguages(req, res) {
        const  userID  = req.params['userid'];
        const languageIDs  = req.body.languages;
        console.log(languageIDs)
        try {
          const result = await advancedInfoService.updateLanguages(userID, languageIDs);
          res.status(200).json({ message: "Languages updated successfully" });
        } catch (error) {
          console.error("Error updating languages:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
    
      static async updateAdvancedCriteria(req, res) {
        const  userID  = req.params['userid'];
        const { criteriaIDs } = req.body;
    
        try {
          const result = await advancedInfoService.updateAdvancedCriteria(userID, criteriaIDs);
          res.status(200).json({ message: "Advanced criteria updated successfully" });
        } catch (error) {
          console.error("Error updating advanced criteria:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }

      static async updateFormations(req, res) {
        const userID = req.params['userid'];
        const newFormations = req.body.formations;
    
        try {
          const result = await advancedInfoService.updateFormations(userID, newFormations);
          res.status(200).json({ message: "Formations updated successfully" });
        } catch (error) {
          console.error("Error updating formations:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
    
      static async updateEducation(req, res) {
        const userID = req.params['userid'];
        const newEducations = req.body.educations;
    
        try {
          const result = await advancedInfoService.updateEducation(userID, newEducations);
          res.status(200).json({ message: "Education records updated successfully" });
        } catch (error) {
          console.error("Error updating education records:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
    
      static async updateExperiences(req, res) {
        const userID = req.params['userid'];
        const newExperiences = req.body;
    
        try {
          const result = await advancedInfoService.updateExperiences(userID, newExperiences);
          res.status(200).json({ message: "Experiences updated successfully" });
        } catch (error) {
          console.error("Error updating experiences:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
}