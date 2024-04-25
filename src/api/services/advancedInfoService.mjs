import formation from "../models/formationModel.mjs"
import education from "../models/educationModel.mjs"
import experience from "../models/pastExperiencesModel.mjs"

export class advancedInfoService{

    static async createFormation(postData) {
        try {
          const newFormation = await formation.create(postData);
          newFormation.save()
          return newFormation;
        } catch (error) {
          throw new Error('Error creating post:', error);
        }
      }


    static async deleteFormation(id) {
        try {
            
            const foundFormation = await formation.findByPk(id);
            
            if (!foundFormation) {
                throw new Error("formation doesn't exist");
            }
            await foundFormation.destroy();
            console.log('formation deleted successfully');
            return true
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    static async getAllFormations(ID){
        try{
        console.log("id: ")
        console.log(ID)
        const formations = await formation.findAll({
            where: {
                userID:ID
            }
        })
        console.log(formations)
        return formations
        }catch(error){
            console.log(error)
        }
    }

    static async createEducation(postData) {
        try {
            const newEducation = await education.create(postData);
            return newEducation;
        } catch (error) {
            throw new Error('Error creating education:', error);
        }
    }

    static async deleteEducation(id) {
        try {
            const foundEducation = await education.findByPk(id);

            if (!foundEducation) {
                throw new Error("Education doesn't exist");
            }

            await foundEducation.destroy();
            console.log('Education deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting education:', error);
            throw error;
        }
    }

    static async getAllEducation(userID) {
        try {
            const educations = await education.findAll({
                where: {
                    userID: userID
                }
            });
            return educations;
        } catch (error) {
            console.error('Error fetching educations:', error);
            throw error;
        }
    }

    static async createExperience(postData) {
        try {
            const newPastExperience = await experience.create(postData);
            return newPastExperience;
        } catch (error) {
            throw new Error('Error creating past experience:', error);
        }
    }

    static async deleteExperience(id) {
        try {
            const foundPastExperience = await experience.findByPk(id);

            if (!foundPastExperience) {
                throw new Error("Past experience doesn't exist");
            }

            await foundPastExperience.destroy();
            console.log('Past experience deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting past experience:', error);
            throw error;
        }
    }

    static async getAllExperiences(userID) {
        try {
            const pastExperiences = await experience.findAll({
                where: {
                    userID: userID
                }
            });
            return pastExperiences;
        } catch (error) {
            console.error('Error fetching past experiences:', error);
            throw error;
        }
    }
}