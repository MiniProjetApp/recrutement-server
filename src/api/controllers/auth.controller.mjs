import { NotFoundError } from "../helpers/Error.mjs";
import {
  registerCandidate,
  registerEnterpriseUser,
  login,
} from "../services/authService.mjs";
export class AuthController {
  static async login(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      console.log(email + " " + password);
      login(email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async register(req, res) {
    try {
      console.log(req.body);
      const { role, ...userData } = req.body;
      let newUser;
      console.log("Account type:", role); // Log the role value
      if (role === "candidate") {
        newUser = await registerCandidate(role, userData);
      } else if (role === "entreprise") {
        newUser = await registerEnterpriseUser(role, userData);
      } else {
        return res.status(400).json({ message: "Invalid account type" });
      }
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
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
