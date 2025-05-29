import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://taniya:Taniya2002@cluster0.c2dmszg.mongodb.net/food-del').then(() => console.log("DB Connected"));
}
