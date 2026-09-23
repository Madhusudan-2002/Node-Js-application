const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // await mongoose.connection.dropDatabase();
    // Equivalent to ddl-auto=create

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;