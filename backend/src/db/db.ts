import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    // const connectionInstance = await mongoose.connect(
    //   `${process.env.DATABASE_URI}`
    // );
    const connectionInstance = await mongoose.connect(
      ` mongodb+srv://new:xP0U3KZJQM7yFqAl@cluster0.une21tv.mongodb.net/`
    );

    return connectionInstance.connection.host;
  } catch (error) {
    return error;
  }
};
export default databaseConnection;
