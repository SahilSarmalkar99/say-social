import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Server
    app.listen(PORT, () => {
      console.log(`
 http://localhost:${PORT}
`);
    });
  } catch (error) {
    console.error("Server Failed to Start");
    console.error(error);
  }
};

startServer();
