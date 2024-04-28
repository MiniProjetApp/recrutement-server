
import jwt from "jsonwebtoken"

export class AuthMiddleware {
  static auth(req, res, next) {
    const token = req.header("Authorization");
    const tokenWithoutBearer = token.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      console.log(tokenWithoutBearer)
      const decoded = jwt.verify(tokenWithoutBearer, "carmaker123");

      req.user = decoded;
      console.log(decoded)
      next();
    } catch (error) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  }

  static isAdmin(req, res, next) {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized: Admin access required" });
    }
  }

  static isCandidate(req, res, next) {
    if (req.user && req.user.role === "candidate") {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized: User access required" });
    }
  }

  static isEntreprise(req, res, next) {
    if (req.user && req.user.role === "entreprise") {
      next();
    } else {
      res.status(403).json({ msg: "Unauthorized: Enterprise access required" });
    }
  }
}


