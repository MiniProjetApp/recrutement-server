import {userService} from "../services/userService.mjs"
import { advancedInfoService } from "../services/advancedInfoService.mjs"
import Candidate from "../models/candidateProfileModel.mjs"

export class userController{
    static async getCandidateInfo(req,res){
        try{
            const userData = await userService.getCandidateInfo(req.params['id']);
            const userEducation = await advancedInfoService.getAllEducation(req.params['id']);
            const userExperiences = await advancedInfoService.getAllExperiences(req.params['id']);
            const userFormations = await advancedInfoService.getAllFormations(req.params['id']);
            const userLanguages = await advancedInfoService.getLanguagesByUserID(req.params['id']);
            const userCriteria = await advancedInfoService.getCriteriasByUserID(req.params['id'])
            let finalobject = {userData:userData,
              languages: userLanguages,
              experience : userExperiences,
              formations : userFormations,
              education: userEducation,
              criteria: userCriteria
            }

            console.log(userLanguages)
            res.status(200).json(finalobject)
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
    static async updateCandidateProfile(req, res) {
        try {
          const updatedProfile = await userService.updateCandidateProfile(req.params["id"], req.body);
          res.status(200).json(updatedProfile);
          console.log("Candidate profile updated:", updatedProfile);
        } catch (error) {
          if (error.status) {
            res.status(error.status).json({ message: error.message });
          } else {
            res.status(400).json({ message: error.message });
          }
        }
      }
    
      static async updateEnterpriseProfile(req, res) {
        try {
          const updatedProfile = await userService.updateEnterpriseProfile(req.params["id"], req.body);
          res.status(200).json(updatedProfile);
          console.log("Enterprise profile updated:", updatedProfile);
        } catch (error) {
          if (error.status) {
            res.status(error.status).json({ message: error.message });
          } else {
            res.status(400).json({ message: error.message });
          }
        }
      }
    
}