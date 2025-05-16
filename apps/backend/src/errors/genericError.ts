import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import type { ApiResponse } from "@/types";

export const handleGenericError = (err: Error, myResponseObj: ApiResponse<null>) => {
    myResponseObj.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    myResponseObj.message =
        env.NODE_ENV === "production" ? "Internal Server Error" : `${err.name}: ${err.message}`;
};
