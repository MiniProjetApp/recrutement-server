import documentModel from "../models/verificationDocumentsModel.mjs"
import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';
import {projectDir} from "../../index.mjs"


export class DocumentsController{
  static async newDocuments(req, res) {
    const upload = multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/documents');
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, uniqueSuffix + path.extname(file.originalname));
        }
      })
    }).array('files', 10);

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        res.status(500).json({ error: 'Multer error occurred.' });
        console.log(err);
      } else if (err) {
        console.log(err);
        // An unknown error occurred.
        res.status(500).json({ error: 'An unknown error occurred.' });
      } else {
        try {
          const files = req.files;
          const userID = req.body.userID;
          const documentPromises = files.map(file => {
            const fileUrl = 'http://localhost:3000/uploads/documents/' + file.filename;
            return documentModel.create({
              resource_link: fileUrl,
              userID: userID
            });
          });
          await Promise.all(documentPromises);
          res.status(200).json({ message: 'Files uploaded successfully.' });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'An error occurred while saving documents to the database.' });
        }
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
          const documents = await  documentModel.findAll({
            where: { userID: userID },
            attributes: ['resource_link']
          });
          const documentPaths = documents.map(doc => (projectDir+"/"+doc.resource_link));
          const sanitizedPaths = documentPaths.map(path => path.replace(/\\/g, '/'));
          console.log(documents)
          res.status(200).json(documents);
        } catch (error) {
          console.error("Error retrieving documents:", error);
          res.status(500).json({ error: 'An error occurred while retrieving documents.' });
        }
      }
      
}