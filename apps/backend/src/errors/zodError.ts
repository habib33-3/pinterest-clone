import { StatusCodes } from "http-status-codes";
import type { ZodError } from "zod";

import type { ApiResponse } from "@/types";

export const handleZodError = (err: ZodError, myResponseObj: ApiResponse<null>) => {
    myResponseObj.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    myResponseObj.message =
        "Validation failed: " +
        err.errors.map((e) => `${e.path.join(".")} - ${e.message}`).join(", ");
};
