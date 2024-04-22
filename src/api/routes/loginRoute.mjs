const upload = multer()
import multer from 'multer';
import express from 'express';

import {login} from '../services/authService.mjs';

const router = express.Router();

router.post('/login',upload.none(), async (req, res) => {
    try {
        console.log(req.body)
        const {email,password} = req.body;
        console.log(email+" "+password); 
        login(email,password)
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
