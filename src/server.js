const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const { testDatabaseConnection } = require("./config/db");

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await testDatabaseConnection();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
}

startServer();
