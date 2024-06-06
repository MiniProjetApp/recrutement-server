import formation from "../models/formationModel.mjs"
import education from "../models/educationModel.mjs"
import experience from "../models/pastExperiencesModel.mjs"
import UserLanguages from "../models/userLanguages.mjs"
import UserAdvancedCriterias from "../models/userAdvancedCriteriasModel.mjs"
import AdvancedCriteria from "../models/advancedCriteriasModel.mjs"
import PostLanguages from "../models/postLanguagesModel.mjs"

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

    static async getHighestEducation(userID, fieldID) {
        try {
          const highestEducation = await education.findOne({
            where: {
              userID,
              fieldID
            },
            order: [['level', 'DESC']], 
            limit: 1
          });
          
          return highestEducation;
        } catch (error) {
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
    static async getSumOfExperience(userID, fieldID) {
        try {
          const sumOfTimeSpent = await experience.sum('time_spent', {
            where: {
              userID,
              fieldID
            }
          });
          
          return sumOfTimeSpent;
        } catch (error) {
          throw error;
        }
      }

      static async updateLanguages(userID, languages) {
        try {
          // Remove old languages associated with the user
          await UserLanguages.destroy({
            where: {
              userID: userID,
            },
          });
    
          const promises = languages.map(async (language) => {
            await UserLanguages.create({
              userID: userID,
              languageID: language.languageID,
              level: language.level,
            });
          });
    
          await Promise.all(promises);
          console.log("Languages updated successfully");
          return true;
        } catch (error) {
          console.error("Error updating languages:", error);
          throw error;
        }
      }

      static async updateExperiences(userID, newExperiences) {
        try {
          await experience.destroy({
            where: {
              userID: userID,
            },
          });

          console.log(newExperiences)
    
          const promises = newExperiences.map(async (exp) => {
            await experience.create({
              userID: userID,
              fieldID: exp.fieldID,
              subfieldID: exp.subfieldID,
              workplace_name: exp.workplace_name,
              time_spent: exp.time_spent,
            });
          });
    
          await Promise.all(promises);
          console.log("Experiences updated successfully");
          return true;
        } catch (error) {
          console.error("Error updating experiences:", error);
          throw error;
        }
      }

      static async updateFormations(userID, newFormations) {
        try {
          await formation.destroy({
            where: {
              userID: userID,
            },
          });
    
          const promises = newFormations.map(async (formationData) => {
            await formation.create({
              userID: userID,
              nom: formationData.nom,
              institu: formationData.institu,
              fieldID:formationData.fieldID
            });
          });
    
          await Promise.all(promises);
          console.log("Formations updated successfully");
          return true;
        } catch (error) {
          console.error("Error updating formations:", error);
          throw error;
        }
      }

      static async updateEducation(userID, newEducations) {
        try {
          await education.destroy({
            where: {
              userID: userID,
            },
          });
    
          const promises = newEducations.map(async (educationData) => {
            await education.create({
              userID: userID,
              diploma_type: educationData.diploma_type,
              level: educationData.level,
              institution: educationData.institution,
              fieldID: educationData.fieldID,
            });
          });
    
          await Promise.all(promises);
          console.log("Education records updated successfully");
          return true;
        } catch (error) {
          console.error("Error updating education records:", error);
          throw error;
        }
      }
    
      static async updateAdvancedCriteria(userID, criteriaIDs) {
        try {
        console.log(userID)

          await UserAdvancedCriterias.destroy({
            where: {
              userID: userID,
            },
          });
    
          // Add updated advanced criteria
          const promises = criteriaIDs.map(async (criteriaID) => {
            await UserAdvancedCriterias.create({
              userID: userID,
              criteriaID: criteriaID,
            });
          });
    
          await Promise.all(promises);
          console.log("Advanced criteria updated successfully");
          return true;
        } catch (error) {
          console.error("Error updating advanced criteria:", error);
          throw error;
        }
      }

      static async addPostLanguages(postID, languageData) {
        try {
         
          const promises = languageData.map(async (data) => {
            await PostLanguages.create({
              postID: postID,
              languageID: data
            });
          });
    
          await Promise.all(promises);
          console.log("Post languages updated successfully");
          return true;
        } catch (error) {
          console.error("Error updating post languages:", error);
          throw error;
        }
      }
    
      static async addAdvancedCriteria(postID, criteriaIDs) {
        try {
          const promises = criteriaIDs.map(async (criteriaID) => {
            await AdvancedCriteria.create({
              postID: postID,
              criteriaID: criteriaID,
            });
          });
    
          await Promise.all(promises);
          console.log("Advanced criteria updated successfully");
          return true;
        } catch (error) {
          console.error("Error updating advanced criteria:", error);
          throw error;
        }
      }

      static async getLanguagesByUserID(userID) {
        try {
            const userLanguages = await UserLanguages.findAll({
                where: {
                    userID: userID
                }
            });
            return userLanguages;
        } catch (error) {
            console.error('Error fetching user languages:', error);
            throw error;
        }
    }

    static async getCriteriasByUserID(userID) {
      try {
          const userCriterias = await UserAdvancedCriterias.findAll({
              where: {
                  userID: userID
              }
          });
          return userCriterias;
      } catch (error) {
          console.error('Error fetching user criterias:', error);
          throw error;
      }
  }
}