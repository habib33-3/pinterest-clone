import { apiPrivate } from "@/lib/api/apiPrivate";
import { apiPublic } from "@/lib/api/apiPublic";

import type {
  LoginFormSchemaType,
  RegisterUserFormSchemaType,
} from "@/validations/auth";

import type { ApiResponse, User } from "../types";

export const createUserApi = async ({
  email,
  userName,
  password,
}: RegisterUserFormSchemaType) => {
  return apiPublic.post<ApiResponse<User>>("/user", {
    email,
    userName,
    password,
  });
};

export const loginUserApi = async ({
  email,
  password,
}: LoginFormSchemaType) => {
  return apiPublic.post<ApiResponse<User>>("/user/login", {
    email,
    password,
  });
};

export const logoutApi = async () => {
  return apiPrivate.post("/user/logout");
};
