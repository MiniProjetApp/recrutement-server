import User from "../models/userModel.mjs";
import candidateProfile from "../models/candidateProfileModel.mjs";
import ProfileEntreprise from "../models/entrepriseProfileModel.js";
import EnterpriseProfile from "../models/entrepriseProfileModel.js";

export class userService{
    static async getCandidateInfo(userTargetID){
        try{
        const userData = await candidateProfile.findByPk(userTargetID)
        if (!userData){
            const notFoundError = new Error("User doesn't exist");
            notFoundError.status = 404;
            throw notFoundError;
        }else{
        return(userData.dataValues)}}
        catch(error){
            throw error;
        }
    }
    static async getEntrepriseInfo(userTargetID){
        try{
            console.log("gg")
            const userData = await EnterpriseProfile.findByPk(userTargetID)
            if (!userData){
                const notFoundError = new Error("User doesn't exist");
                notFoundError.status = 404;
                throw notFoundError;
            }else{
            return(userData.dataValues)}}
            catch(error){
                throw error;
            }
        }
}