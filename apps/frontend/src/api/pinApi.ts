import type { AxiosResponse } from "axios";

import { apiPrivate } from "@/lib/api/apiPrivate";
import { apiPublic } from "@/lib/api/apiPublic";

import type {
  CanvasOptions,
  TextBoxOptions,
  TextOptions,
} from "@/types/editingOptions";
import type { ApiResponse } from "@/types/response";

import type {
  CreatePinFormSchemaType,
  SavePinToNewBoardSchemaType,
} from "@/validations/pin";

import type { Pin } from "../types";

export const createPinApi = async (
  data: CreatePinFormSchemaType,
  uploadedImage: File | null,
  options: {
    canvasOptions?: CanvasOptions;
    textOptions?: TextOptions;
    textBoxOptions?: TextBoxOptions;
  }
) => {
  const formData = new FormData();

  formData.append("title", data.title);

  if (data.description) {
    formData.append("description", data.description);
  }

  if (data.link) {
    formData.append("link", data.link);
  }

  if (data.newBoardTitle) {
    formData.append("newBoardTitle", data.newBoardTitle);
  }

  if (data.newBoardDescription) {
    formData.append("newBoardDescription", data.newBoardDescription);
  }

  if (data.isBoardPrivate !== undefined) {
    formData.append("isNewBoardPrivate", String(data.isBoardPrivate));
  }

  if (data.board) {
    formData.append("board", data.board);
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

  if (uploadedImage) {
    formData.append("image", uploadedImage);
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

  return res.data.data;
};

export const getAllPinsApi = async (
  search?: string
): Promise<ApiResponse<Pin[]>> => {
  const res = await apiPrivate.get<ApiResponse<Pin[]>>(
    `/pin?search=${search as string}`
  );
  return res.data;
};

export const getSinglePinByIdApi = async (
  id: string
): Promise<ApiResponse<Pin>> => {
  const res = await apiPublic.get<ApiResponse<Pin>>(`/pin/${id}`);

  return res.data;
};

export const savePinApi = async (pinId: string, boardId: string) => {
  const res = await apiPrivate.post<ApiResponse<{ message: string }>>(
    "/pin/save",
    {
      pinId,
      boardId,
    }
  );

  return res.data;
};

export const savePinInNewBoardApi = async ({
  board,
  pinId,
}: {
  pinId: string;
  board: SavePinToNewBoardSchemaType;
}) => {
  const data = {
    newBoardTitle: board.boardTitle,
    pinId,
    isNewBoardPrivate: board.isBoardPrivate,
  };

  const res = await apiPrivate.post<ApiResponse<{ message: string }>>(
    "/pin/save/new-board",
    data
  );

  return res.data;
};
