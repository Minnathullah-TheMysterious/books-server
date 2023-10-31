import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
      throw new Error("DB_URL environment variable not set");
    }

    await mongoose.connect(dbUrl);
    console.log("Connected to database");
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Something went wrong while connecting to database. ",
        error.message
      );
    } else {
      console.error("An unknown error occurred");
    }
  }
};

export default dbConnect;
