import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;
const DATABASE_URL =
  "mongodb+srv://devhasanmia:SGtfIPYC2BNbS0nl@library-management.kssf572.mongodb.net/Library-Management?retryWrites=true&w=majority&appName=Library-Management";

async function main() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// DB USER: devhasanmia
// DB PASS: SGtfIPYC2BNbS0nl
