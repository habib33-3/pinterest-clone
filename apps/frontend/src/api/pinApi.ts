import type { AxiosResponse } from "axios";

import { apiPrivate } from "@/lib/api/apiPrivate";

import type {
  CanvasOptions,
  TextBoxOptions,
  TextOptions,
} from "@/types/editingOptions";
import type { ApiResponse } from "@/types/response";

import type { CreatePinFormSchemaType } from "@/validations/pin";

import type { Pin } from "../types";

export const createPinApi = async (
  data: CreatePinFormSchemaType,
  createNewBoard: boolean,
  uploadedImage: File | null,
  options: {
    canvasOptions?: CanvasOptions;
    textOptions?: TextOptions;
    textBoxOptions?: TextBoxOptions;
  }
) => {
  const formData = new FormData();

  formData.append("title", data.title);

  if (uploadedImage) {
    formData.append("image", uploadedImage);
  }

  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.link) {
    formData.append("link", data.link);
  }

  if (data.newBoardTitle) {
    formData.append("newBoardTitle", data.newBoardTitle);
  }

  if (data.board) {
    formData.append("board", data.board);
  }

  if (createNewBoard) {
    formData.append("createNewBoard", String(createNewBoard));
  }

  if (data.tags && data.tags.length > 0) {
    data.tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });
  }

  if (options.canvasOptions) {
    formData.append("canvasOptions", JSON.stringify(options.canvasOptions));
  }

  if (options.textOptions) {
    formData.append("textOptions", JSON.stringify(options.textOptions));
  }

  if (options.textBoxOptions) {
    formData.append("textBoxOptions", JSON.stringify(options.textBoxOptions));
  }

  const res = await apiPrivate.post<AxiosResponse<ApiResponse<Pin>>>(
    "/pin",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log(res.data.data);

  return res.data.data;
};
