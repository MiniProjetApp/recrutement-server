import documentModel from "../models/verificationDocumentsModel.mjs"
import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';
import {projectDir} from "../../index.mjs"


export class DocumentsController{
    static async newDocuments(req, res) {
      let final_name;
        const upload = multer({
          storage: multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'uploads/documents');
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
              final_name = 'uploads/documents/'+uniqueSuffix + path.extname(file.originalname)
              cb(null, uniqueSuffix + path.extname(file.originalname));
            }
          })
        }).array('files', 10);
    
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            res.status(500).json({ error: 'Multer error occurred.' });
            console.log(err)
          } else if (err) {
            console.log(err)
            // An unknown error occurred.
            res.status(500).json({ error: 'An unknown error occurred.' });
          } else {
            try{
              documentModel.create({
                resource_link:final_name,
                userID:req.body.userID
              })
            }catch(error){
              console.log(error)
            }
            res.status(200).json({ message: 'Files uploaded successfully.' });
          }
        });
      }

      static async getUserDocuments(req, res) {
        const userID = req.params['userid']; 
        if (!userID) {
          return res.status(400).json({ error: 'UserID is required.' });
        }
        try {
          const __filename = fileURLToPath(import.meta.url)
          // const projectDir = path.dirname(__filename)
          // console.log(projectDir);
          const documents = await  documentModel.findAll({
            where: { userID: userID },
            attributes: ['resource_link']
          });
          const documentPaths = documents.map(doc => (projectDir+doc.resource_link));
          const sanitizedPaths = documentPaths.map(path => path.replace(/\\/g, '/'));
      
          res.status(200).json({ documents: sanitizedPaths });
        } catch (error) {
          console.error("Error retrieving documents:", error);
          res.status(500).json({ error: 'An error occurred while retrieving documents.' });
        }
      }
      
}