import ImageKit from "imagekit";

import { env } from "@/config/env.config";

const imageKit = new ImageKit({
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadImageToImageKit = async (
    file: Express.Multer.File,
    folderName: "avatar" | "pins",
    transformationString?: string
) => {
    const options: Parameters<typeof imageKit.upload>[0] = {
        file: file.buffer,
        fileName: file.originalname,
        folder: folderName,
    };

    if (transformationString) {
        options.transformation = { pre: transformationString };
    }
    return imageKit.upload(options);
};
