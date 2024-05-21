import {userService} from "../services/userService.mjs"
import { advancedInfoService } from "../services/advancedInfoService.mjs"
import multer from "multer"
import path from "path"

import CandidateProfile from "../models/candidateProfileModel.mjs"
import EnterpriseProfile from "../models/entrepriseProfileModel.js"


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
              role: userData.role,
              email: userData.email,
              languages: userLanguages,
              experience : userExperiences,
              formations : userFormations,
              education: userEducation,
              criteria: userCriteria,
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
          console.log("ge")
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

      static async deleteUser(req, res) {
        try {
          const userId = req.params.userID;
          await userService.deleteUser(userId);
          res.status(200).json({ message: 'User deleted successfully.' });
        } catch (error) {
          if (error.status) {
            res.status(error.status).json({ message: error.message });
          } else {
            res.status(400).json({ message: error.message });
          }
        }
      }
    
    

      static async uploadProfilePicture(req, res) {
        let final_name;
        
        const upload = multer({
          storage: multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'uploads/profile_pictures');
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
              final_name = 'http://localhost:3000/uploads/profile_pictures/' + uniqueSuffix + path.extname(file.originalname);
              console.log(`got here`)


              cb(null, uniqueSuffix + path.extname(file.originalname));
            }
          })
        }).single('picture'); 
        
        upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
            console.log(err)
            res.status(500).json({ error: 'Multer error occurred.' });
          } else if (err) {
            res.status(500).json({ error: 'An unknown error occurred.' });
          } else {
            try {
              const userID = req.body.userID;
              console.log(userID)
              const userType = req.body.userType;
              console.log(userType)
    
              if (userType === 'candidate') {
                await CandidateProfile.update({ picture: final_name }, { where: { userID } });
                console.log(`added ${final_name}`)
              } else if (userType === 'entreprise') {
                await EnterpriseProfile.update({ logo: final_name }, { where: { userID } });
              } else {
                return res.status(400).json({ error: 'Invalid user type.' });
              }
              res.status(200).json({ message: 'Profile picture/logo uploaded successfully.' });
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Failed to upload profile picture/logo.' });
            }
          }
        });
      }

      static async get_own_profile(req, res) {
        try {
            const { role } = req.user; 
            let userData;
            console.log(role)

            if (role === 'candidate') {
                userData = await userService.getCandidateInfo(req.user.userId);
              const userEducation = await advancedInfoService.getAllEducation(req.user.userId);
              const userExperiences = await advancedInfoService.getAllExperiences(req.user.userId);
              const userFormations = await advancedInfoService.getAllFormations(req.user.userId);
              const userLanguages = await advancedInfoService.getLanguagesByUserID(req.user.userId);
              const userCriteria = await advancedInfoService.getCriteriasByUserID(req.user.userId)
              let finalobject = {userData:userData,
                role: userData.role,
                email: userData.email,
                languages: userLanguages,
                experience : userExperiences,
                formations : userFormations,
                education: userEducation,
                criteria: userCriteria
            }

            console.log(userLanguages)
            res.status(200).json(finalobject)
            console.log(userData)

            } else if (role === 'entreprise') {
                userData = await userService.getEntrepriseInfo(req.user.userId);
              res.status(200).json(userData);

            } else {
                return res.status(400).json({ error: 'Invalid account type.' });
            }

            // res.status(200).json(userData);
            console.log(userData);
        } catch (error) {
            if (error.status) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message });
            }
        }
    }
}