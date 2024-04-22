
const upload = multer()
import multer from 'multer';
import express from 'express';

import {registerCandidate, registerEnterpriseUser} from '../services/authService.mjs';

const router = express.Router();

router.post('/register',upload.none(), async (req, res) => {
    try {
        console.log(req.body)
        const { accountType, ...userData } = req.body;
        let newUser;
        console.log("Account type:", accountType); // Log the accountType value
        if (accountType === 'candidate') {
            newUser = await registerCandidate(accountType,userData);
        } else if (accountType === 'entreprise') {
            newUser = await registerEnterpriseUser(accountType,userData);
        } else {
            return res.status(400).json({ message: 'Invalid account type' });
        }
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
