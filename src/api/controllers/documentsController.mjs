import documentModel from "../models/verificationDocumentsModel.mjs"
import multer from "multer"
import path from "path"

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
}