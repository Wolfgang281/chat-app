import app from "./app.js";
import { connectDatabase } from "./src/config/database.config.js";
import { PORT } from "./src/config/index.util.js";

if (!PORT) {
  console.error("PORT is not defined in environment variables.");
  process.exit(1);
}

connectDatabase()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log(`Error while starting the server......`);
        process.exit(1);
      }
      console.log(`Server is running on port ${PORT}`);
    });

    app.on("error", (error) => {
      console.log(`Error occurred: ${error.message}`);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
