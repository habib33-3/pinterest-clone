import { Router } from "express";

import { loginUserSchema, registerUserSchema } from "@/validations/user.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth.middleware";

import {
    getUsersProfileHandler,
    registerUserHandler,
    userLoginHandler,
    userLogoutHandler,
} from "@/controllers/user.controllers";

const router = Router();

router.post("/", validationMiddleware(registerUserSchema), registerUserHandler);

router.post("/login", validationMiddleware(loginUserSchema), userLoginHandler);

router.post("/logout", verifyAuth, userLogoutHandler);

router.get("/profile/:userName", getUsersProfileHandler);

export const userRouter = router;
