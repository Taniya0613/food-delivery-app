import expresss from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = expresss.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login",loginUser);

export default userRouter;

