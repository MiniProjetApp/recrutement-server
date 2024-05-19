import User from "../models/userModel.mjs";
import sequelize from "../config/sequelize.mjs";
import { Op, where } from "sequelize";
import candidateProfile from "../models/candidateProfileModel.mjs";
import ProfileEntreprise from "../models/entrepriseProfileModel.js";
import EnterpriseProfile from "../models/entrepriseProfileModel.js";
import userModel from '../models/userModel.mjs'
import {projectDir} from "../../index.mjs"
import { advancedInfoService } from "./advancedInfoService.mjs";


export class userService {
  static async getCandidateInfo(userTargetID) {
    let token = null; 
    try {
      const userData = await candidateProfile.findByPk(userTargetID);
      const userData2 = await userModel.findByPk(userTargetID)
      const role = userData2.role
      const email = userData2.email
      console.log(userTargetID);
      if (!userData) {
        const notFoundError = new Error("User doesn't exist");
        notFoundError.status = 404;
        throw notFoundError;
      } else {
        userData.dataValues.role = role
        userData.dataValues.email = email
        if (userData.picture){
          userData.dataValues.picture = (projectDir+userData.dataValues.picture).replace(/\\/g, '/')}
          console.log("result: ")
          console.log(userData.dataValues)
          return userData.dataValues;
      }
    } catch (error) {
      throw error;
    }
  }
  static async getEntrepriseInfo(userTargetID) {
    try {
      console.log("gg");
      const userData = await EnterpriseProfile.findByPk(userTargetID);
      const userData2 = await userModel.findByPk(userTargetID)
      const role = userData2.role
      const email = userData2.email
      
      if (!userData) {
        // const notFoundError = new Error("User doesn't exist");
        // notFoundError.status = 404;
        // throw notFoundError;
        return null;
      } else {
        userData.dataValues.role = role
        userData.dataValues.email = email
        return userData.dataValues;
      }
    } catch (error) {
      throw error;
    }
  }
  static async searchCandidates(params) {
    try {
      const whereClause = {};

      if (params && typeof params === "object") {
        if (params.name) {
          whereClause[Op.or] = [
            { first_name: { [Op.like]: `%${params.name}%` } },
            { last_name: { [Op.like]: `%${params.name}%` } },
            {
              [Op.and]: [
                { first_name: { [Op.like]: `%${params.name.split(" ")[0]}%` } },
                { last_name: { [Op.like]: `%${params.name.split(" ")[1]}%` } },
              ],
            },
          ];
        }
        if (params.fieldID) {
          whereClause.fieldID = params.fieldID;
        }
        if (params.is_verified) {
          whereClause.is_verified = params.is_verified;
        }
      }
      console.log("where clause: ");
      console.log(whereClause);
      const candidateProfiles = await candidateProfile.findAll({
        where: whereClause,
      });
      return candidateProfiles;
    } catch (error) {
      console.error("Error searching candidate profiles:", error);
      throw error;
    }
  }
  static async searchEntreprise(params) {
    try {
      const whereClause = {};
      if (params && typeof params === "object") {
        if (params.name) {
          whereClause.name = { [Op.like]: `%${params.name}%` };
        }
        if (params.fieldID) {
          whereClause.fieldID = params.fieldID;
        }
        if (params.headquarter_state) {
          whereClause.headquarter_state = params.headquarter_state;
        }
        if (params.is_verified) {
          whereClause.is_verified = params.is_verified;
        }
      }

      const entrepriseProfiles = await EnterpriseProfile.findAll({
        where: whereClause,
      });
      return entrepriseProfiles;
    } catch (error) {
      console.error("Error searching entreprise profiles:", error);
      throw error;
    }
  }

  static async updateCandidateProfile(userTargetID, newData) {
    try {
      const candidateProfileData = await candidateProfile.findByPk(
        userTargetID
      );
      if (!candidateProfileData) {
        const notFoundError = new Error("Candidate profile doesn't exist");
        notFoundError.status = 404;
        throw notFoundError;
      }

      await candidateProfile.update(newData, {
        where: { userID: userTargetID },
      });

      const updatedCandidateProfile = await userService.getCandidateInfo(userTargetID);
      const userExperiences = await advancedInfoService.getAllExperiences(userTargetID);
      const userFormations = await advancedInfoService.getAllFormations(userTargetID);
      const userLanguages = await advancedInfoService.getLanguagesByUserID(userTargetID);       
      const userEducation = await advancedInfoService.getAllEducation(userTargetID);
      const userCriteria = await advancedInfoService.getCriteriasByUserID(userTargetID)

      let finalobject = {userData:updatedCandidateProfile,
        email:updatedCandidateProfile.email,
        role:updatedCandidateProfile.role,
        languages: userLanguages,
        experience : userExperiences,
        formations : userFormations,
        education: userEducation,
        criteria: userCriteria
        }

      return(finalobject)
            
    } catch (error) {
      console.error("Error updating candidate profile:", error);
      throw error;
    }
  }

  static async updateEnterpriseProfile(userTargetID, newData) {
    try {
      const enterpriseProfileData = await EnterpriseProfile.findByPk(
        userTargetID
      );
      if (!enterpriseProfileData) {
        const notFoundError = new Error("Enterprise profile doesn't exist");
        notFoundError.status = 404;
        throw notFoundError;
      }

      await EnterpriseProfile.update(newData, {
        where: { userID: userTargetID },
      });

      // Fetch and return the updated enterprise profile
      const updatedEnterpriseProfile = await userService.getEntrepriseInfo(
        userTargetID
      );
      return updatedEnterpriseProfile;
    } catch (error) {
      console.error("Error updating enterprise profile:", error);
      throw error;
    }
  }
}
