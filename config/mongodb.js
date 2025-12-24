import mongoose from "mongoose";
const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("mongdb is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};
export default mongoDB;
