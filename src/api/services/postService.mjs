import Post from "../models/postModel.mjs"
import PostLanguages from "../models/postLanguagesModel.mjs"
import AdvancedCriteria from "../models/advancedCriteriasModel.mjs"
import { advancedInfoService } from "./advancedInfoService.mjs"

export class PostService{
    static async findAll(){
      try {
        const posts = await Post.findAll();
        
        const postsWithData = await Promise.all(posts.map(async (post) => {
          const postLanguages = await PostLanguages.findAll({
            where: {
              postID: post.postID,
            },
          });
          const languages = postLanguages.map(language => ({
            languageID: language.languageID,
            level: language.level
          }));
    
          const postCriterias = await AdvancedCriteria.findAll({
            where: {
              postID: post.postID,
            },
          });
          const criterias = postCriterias.map(criteria => criteria.criteriaID);
          let finalobject = {...post.toJSON(),
          languages: languages,
          criterias: criterias
          }
          if (criterias.length===0){
            delete finalobject['criterias']
          }
          if (languages.length===0){
            delete finalobject['languages']
          }
          // Construct the data object for the post
          return (finalobject);
        }));
    
        console.log(postsWithData);
        return(postsWithData) // This will log all posts along with their associated languages and criteria
      } catch (error) {
        console.error('Error fetching posts:', error);
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
          let finalobject = {...post.toJSON(),
            languages: languages,
            criterias: criterias
            }
            if (criterias.length===0){
              delete finalobject['criterias']
            }
            if (languages.length===0){
              delete finalobject['languages']
            }
            // Construct the data object for the post
            return (finalobject);
          }
      }catch(error){
        throw error;
      }
      }
}
