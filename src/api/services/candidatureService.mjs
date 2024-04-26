import post from "../models/postModel.mjs"
import education from "../models/educationModel.mjs"
import experience from "../models/pastExperiencesModel.mjs"
import { advancedInfoService } from "./advancedInfoService.mjs"
import { PostService } from "./postService.mjs"
import {userService} from "./userService.mjs"

export class candidatureService{
    static async new(data){
        let score = 0;
        const post = await PostService.getPostInfo(data.postID)
        const postInfo = post.dataValues
        const postField = postInfo.fieldID
        const userInfo = await userService.getCandidateInfo(data.userID)
        
        if (postInfo.study_level){
            const userHighestEducation = await advancedInfoService.getHighestEducation(data.userID,postField)
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
            const userSumExperienceTime = await advancedInfoService.getSumOfExperience(data.userID,postField)
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

        if (postInfo.fieldID && userInfo.fieldID){
            score++
        }
}}
