import Post from './postModel.mjs';
import Language from './languageModel.mjs';
import PostLanguages from './postLanguagesModel.mjs';

Post.belongsToMany(Language, { through: PostLanguages });
Language.belongsToMany(Post, { through: PostLanguages });
