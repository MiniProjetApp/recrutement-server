// services/AuthService.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";
import Profile from "../models/candidateProfileModel.mjs";
import ProfileEntreprise from "../models/entrepriseProfileModel.js";

export class AuthService {
  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign(
      {
        userId: user.userID,
        role: user.role,
      },
      "carmaker123",
      { expiresIn: "1h" }
    );

    console.log(user.userID);

    return token;
  }

  static async registerCandidate(role, userData) {
    try {
      const email = userData.email;
      const userEmail = await User.findOne({ where: { email } });
      if (userEmail) {
        const conflictError = new Error("Email already exists");
        conflictError.status = 409;
        throw conflictError;
      }
      console.log(userData.password);
      let hashedPass = await bcrypt.hash(userData.password, 12);
      const newUser = await User.create({
        password: hashedPass,
        email: userData.email,
        role: "candidate",
        phone_number: userData.phone_number,
        creation_date: new Date(),
      });

      const newProfile = await Profile.create({
        userID: newUser.userID,
        first_name: userData.first_name,
        last_name: userData.last_name,
        wilaya: userData.wilaya,
        gender: userData.gender,
        birth_date: userData.birth_date,
      });

      await newProfile.save();
      console.log("Candidate registered successfully:", newUser);
    } catch (error) {
      console.error("Error registering candidate:", error);
      throw error;
    }
  }

  static async registerEnterpriseUser(role, userData) {
    try {
      const email = userData.email;
      const userEmail = await User.findOne({ where: { email } });
      if (userEmail) {
        const conflictError = new Error("Email already exists");
        conflictError.status = 409;
        throw conflictError;
      }
      let hashedPass = await bcrypt.hash(userData.password, 12);
      const newUser = await User.create({
        password: hashedPass,
        email: userData.email,
        role: "entreprise",
        phone_number: userData.phone_number,
        creation_date: new Date(),
      });

      const newProfile = await ProfileEntreprise.create({
        userID: newUser.userID,
        name: userData.name,
        headquarter_state: userData.headquarter_state,
        fieldID: userData.fieldID,
        website: userData.website,
      });

      await newProfile.save();
      console.log("Enterprise user registered successfully:", newUser);
    } catch (error) {
      console.error("Error registering enterprise user:", error);
      throw error;
    }
  }
}
