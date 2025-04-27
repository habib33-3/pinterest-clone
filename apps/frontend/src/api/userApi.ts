import { api } from "@/lib/api";

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
  return api.post<ApiResponse<User>>("/user", {
    email: email,
    userName: userName,
    password: password,
  });
};

export const loginUserApi = async ({
  email,
  password,
}: LoginFormSchemaType) => {
  return api.post<ApiResponse<User>>("/user/login", {
    email: email,
    password: password,
  });
};
