import path from "path";

import { StatusCodes } from "http-status-codes";
import multer from "multer";

import { env } from "@/config/env.config";

import ApiError from "@/shared/ApiError";

const storage = multer.memoryStorage();

const uploadImage = multer({
    storage,
    limits: { fileSize: env.MAX_FILE_SIZE },
    fileFilter: function (_req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new ApiError(StatusCodes.BAD_REQUEST, "Invalid file type"));
        }
    },
});

export default uploadImage;
