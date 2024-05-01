import sequelize from "./api/config/sequelize.mjs";
import app from "./api/app.mjs";
import path from "path"
import { fileURLToPath } from 'url';


sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(3000, () => {
  console.log("server started");
});

const __filename = fileURLToPath(import.meta.url)
const projectDir = path.dirname(__filename) 
export {projectDir}