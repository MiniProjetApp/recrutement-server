import { NotFoundError } from "../helpers/Error.mjs";
import {AuthService} from "../services/authService.mjs";
export class AuthController {
  static async login(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      console.log(email + " " + password);
      const token = await AuthService.login(email, password);
      console.log(token)
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async register(req, res) {
    try {
      console.log(req.body);
      const { role, ...userData } = req.body;
      let newUser;
      console.log("Account type:", role); 
      if (role === "candidate") {
        newUser = await AuthService.registerCandidate(role, userData);
      } else if (role === "entreprise") {
        newUser = await AuthService.registerEnterpriseUser(role, userData);
      } else {
        return res.status(400).json({ message: "Invalid account type" });
      }
      res.status(201).json(newUser);
    } catch (error) {
      if (error.status){
        res.status(error.status).json({message: error.message})
      }
      else{
        res.status(400).json({ message: error.message });
      }
    }
  }

  static async test(req, res, next) {
    try {
      throw new NotFoundError("erreur ayahviviw");
    } catch (err) {
      next(err);
    }
  }
}
