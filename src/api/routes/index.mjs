// // routes/index.js

// import express from 'express';
// import fs from 'fs';
// import path from 'path';

// const __dirname = path.dirname(new URL(import.meta.url).pathname); // Get the directory name

// const router = express.Router();

// // Iterate over all route files in the routes folder
// fs.readdirSync(__dirname).forEach(file => {
//     if (file !== 'index.js' && file.endsWith('.mjs')) {
//         // Import and mount route asynchronously
//         (async () => {
//             const route = await import(path.join(__dirname, file));
//             router.use(route.default);
//         })();
//     }
// });

// export default router;
