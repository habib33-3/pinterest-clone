import { apiPrivate } from "@/lib/api/apiPrivate";
import { apiPublic } from "@/lib/api/apiPublic";

import type { ApiResponse } from "@/types/response";

import type {
  LoginFormSchemaType,
  RegisterUserFormSchemaType,
} from "@/validations/auth";

import type { User, UserProfile } from "../types";

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

export const getUserProfileApi = async (userName: string) => {
  const res = await apiPrivate.get<ApiResponse<UserProfile>>(
    `/user/profile/${userName}`
  );

  return res.data.data;
};
