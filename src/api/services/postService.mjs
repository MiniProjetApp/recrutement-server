import Post from "../models/postModel.mjs"
import PostLanguages from "../models/postLanguagesModel.mjs"
import AdvancedCriteria from "../models/advancedCriteriasModel.mjs"
import { advancedInfoService } from "./advancedInfoService.mjs"

export class PostService{
    static async findAll(){
        try{
          console.log("got here")

          const posts = await Post.findAll({
            include: [
                { model: PostLanguages, as: 'languages' },
                { model: AdvancedCriteria, as: 'criterias' }
            ]
        });
        return posts}
        catch(error){
            console.log(error)
        }
    }
    static async create(postData,languages,criterias) {
        try {
          const post = await Post.create(postData);
          post.save()
          if (criterias){
            console.log("there are criterias!!!")
            const createdCriteria = await advancedInfoService.addAdvancedCriteria(post.postID,criterias)
          }
          if (languages){
            const createdLanguages = await advancedInfoService.addPostLanguages(post.postID,languages)
          }
          return post;
        } catch (error) {
          throw new Error('Error creating post:', error);
        }
      }
    static async getPostInfo(postID){
      try{
        const post = await Post.findByPk(postID);
        if (!post){
          const notFoundError = new Error("Post doesn't exist");
          notFoundError.status = 404;
          throw notFoundError;
        }else{
          const postLanguages = await PostLanguages.findAll({
            where: {
                postID: postID
            }
          });
          const postCriteria = await AdvancedCriteria.findAll({
            where:{
              postID:postID
            }
          })
          const languages = postLanguages.map(language => ({
            languageID: language.languageID,
            level: language.level
          }));

          // Extracting criteria data
          const criterias = postCriteria.map(criteria => criteria.criteriaID);
          console.log(criterias)
          console.log(languages)
          // Assigning extracted data to post object
          const postData = {
            ...post.toJSON(), // Convert post instance to plain object
            languages: languages,
            criterias: criterias
        };

          return postData;
          }
      }catch(error){
        throw error;
      }
      }
}
