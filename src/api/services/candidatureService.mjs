import post from "../models/postModel.mjs"
import education from "../models/educationModel.mjs"
import experience from "../models/pastExperiencesModel.mjs"
import { advancedInfoService } from "./advancedInfoService.mjs"
import { PostService } from "./postService.mjs"
import {userService} from "./userService.mjs"
import candidature from "../models/candidatureListModel.mjs"

export class candidatureService{
    static async new(data){

        const existing_candidature = await candidature.findOne({ where: { userID: data.userID,
        postID:data.postID } });
        if (existing_candidature){
            console.log("candidature already exists")
            const conflictError = new Error("candidature already exists");
            conflictError.status = 409;
            throw conflictError;
        }

        let score = 0;
        const post = await PostService.getPostInfo(data.postID)
        const postInfo = post
        console.log(postInfo)
        const userInfo = await userService.getCandidateInfo(data.userID)
        
        if (postInfo.study_level){
            const userHighestEducation = await advancedInfoService.getHighestEducation(data.userID,postInfo.fieldID)
            console.log(userHighestEducation)
            if (userHighestEducation==null){
                console.log("user has no education in the field")
            }else{
                if (userHighestEducation.dataValues.level < postInfo.study_level){
                    console.log(userHighestEducation.dataValues.level)
                    console.log("user doesn't have sufficient edcation")
                }else{
                    score++
                }  
            } 
        }
        if (postInfo.experience_required){
            const userSumExperienceTime = await advancedInfoService.getSumOfExperience(data.userID,postInfo.fieldID)
            console.log(userSumExperienceTime)
            if (userSumExperienceTime==null){
                console.log("user has no experience")
            }else {
                if(userSumExperienceTime < postInfo.experience_required){
                console.log("user doesn't have sufficient experience")
                }else{
                    console.log("user has sufficient experience")
                    score++
                }}
        }
        if (postInfo.wilaya){
            if (userInfo.wilaya == postInfo.wilaya){
                console.log("same wilaya!!!")
                score++
            }else{
                console.log("not smae wilaya :(((")
            }
        }

        if (postInfo.age_max || postInfo.age_min){
            const today = new Date();
            const dob = new Date(userInfo.birth_date);
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            if (postInfo.age_max && postInfo.age_min){
                if (age <= postInfo.age_max && age >= postInfo.age_min){
                    score++;
                    console.log("User is within the age range!");
                } else {
                    console.log(age)
                    console.log("user is out of range")
                }
            } else if (postInfo.age_max) {
                if (age <= postInfo.age_max) {
                    score++;
                    console.log("User's age is below the maximum limit!");
                } else {
                    console.log("user too ld")

                }
            } else if (postInfo.age_min) {
                if (age >= postInfo.age_min) {
                    score++;
                    console.log("User's age is above the minimum limit!");
                } else {
                    console.log("user is too young")

                }
        }
        }

        if(postInfo.languages){
            console.log("has languages!!!!")
            const gottenUserLanguages = await advancedInfoService.getLanguagesByUserID(userInfo.userID)
            const userLanguagesIDs = gottenUserLanguages.map(userLanguage => userLanguage.dataValues.user_languagesID);
            console.log(userLanguagesIDs)
            const postLanguageIDs = postInfo.languages.map(userLanguage => userLanguage.languageID);
            console.log(postLanguageIDs)
            postLanguageIDs.forEach(postLanguageID => {
                if (userLanguagesIDs.includes(postLanguageID)) {
                    console.log("OMG FOUND MATCHING LANGUAGE WOHOOOOOO")
                    score++;
                }else{
                    console.log("found nothing :(((")
                }
            });
        }


        if(postInfo.criterias){
            console.log(postInfo.criterias)
            const gottenUserCriterias = await advancedInfoService.getCriteriasByUserID(userInfo.userID)
            const userCriteriasID = gottenUserCriterias.map(userCriteria => userCriteria.dataValues.criteriaID)
            console.log(userCriteriasID)
            postInfo.criterias.forEach(criteriaID=>{
                if(userCriteriasID.includes(criteriaID)){
                    console.log("OMG FOUND MATCHING CRITERIA WOHOOOOOO")
                    score++;
                }else{
                    console.log("found nothing ;((((")
                }
            })
        }

        const final_candidatre = await candidature.create({
            userID:userInfo.userID,
            postID: postInfo.postID,
            score:score
        })
        await final_candidatre.save()
        console.log(score)
        return true
}

    static async getCandidatures(userID) {
        try {
            const candidatures = await candidature.findAll({ where: { userID } });
            return candidatures;
        } catch (error) {
            console.error("Error fetching candidatures:", error);
            throw new Error("Unable to fetch candidatures");
        }
    }
}
