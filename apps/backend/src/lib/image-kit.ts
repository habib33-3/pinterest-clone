import ImageKit from "imagekit";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

import {
    canvasOptionsSchema,
    type CanvasOptionsType,
    textBoxOptionsSchema,
    type TextBoxOptionsType,
    textOptionsSchema,
    type TextOptionsType,
} from "@/validations/pin.validation";

import { parseJsonWithSchema } from "./json";

const imageKit = new ImageKit({
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
});

export const getImageKitTransformationString = ({
    canvasOptions,
    textOptions,
    textBoxOptions,
}: {
    canvasOptions?: CanvasOptionsType;
    textOptions?: TextOptionsType;
    textBoxOptions?: TextBoxOptionsType;
}): string => {
    if (!canvasOptions || !canvasOptions.size || !canvasOptions.originalSize) {
        return "";
    }

    const originalAspectRatio =
        canvasOptions.originalSize.width / canvasOptions.originalSize.height;
    const targetAspectRatio = canvasOptions.size.width / canvasOptions.size.height;

    let croppingStrategy = "";

    const resized =
        canvasOptions.size.width !== canvasOptions.originalSize.width ||
        canvasOptions.size.height !== canvasOptions.originalSize.height;

    if (resized) {
        if (originalAspectRatio > targetAspectRatio) {
            croppingStrategy = ",cm-pad_resize";
        }
    } else if (
        canvasOptions.originalOrientation === "landscape" &&
        canvasOptions.orientation === "portrait"
    ) {
        croppingStrategy = ",cm-pad_resize";
    }

    const width = canvasOptions.size.width;
    const height = canvasOptions.size.height;

    const textLeftPosition = textBoxOptions
        ? Math.round((textBoxOptions.left / canvasOptions.size.width) * width)
        : 0;

    const textTopPosition = textBoxOptions
        ? Math.round((textBoxOptions.top / canvasOptions.size.height) * height)
        : 0;

    const base = `w-${width},h-${height}${croppingStrategy},bg-${canvasOptions.backgroundColor?.substring(
        1
    )}`;

    const text = textBoxOptions?.text
        ? `,l-text,i-${encodeURIComponent(textBoxOptions.text)},fs-${
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              (textOptions?.fontSize ?? 16) * 2.1
          },lx-${textLeftPosition},ly-${textTopPosition},co-${
              textOptions?.color?.substring(1) ?? "000"
          },l-end`
        : "";

    return `${base}${text}`;
};

export const uploadImageToImageKit = async (
    file: Express.Multer.File,
    folderName: "avatar" | "pins",
    transformationStringOptions?: {
        canvasOptionsString?: string;
        textOptionsString?: string;
        textBoxOptionsString?: string;
    }
) => {
    const options: Parameters<typeof imageKit.upload>[0] = {
        file: file.buffer,
        fileName: file.originalname,
        folder: folderName,
    };

    try {
        if (transformationStringOptions) {
            const { canvasOptionsString, textOptionsString, textBoxOptionsString } =
                transformationStringOptions;

            const canvasOptions =
                (canvasOptionsString &&
                    parseJsonWithSchema(canvasOptionsSchema, canvasOptionsString)) ||
                undefined;

            const textOptions =
                (textOptionsString && parseJsonWithSchema(textOptionsSchema, textOptionsString)) ||
                undefined;

            const textBoxOptions =
                (textBoxOptionsString &&
                    parseJsonWithSchema(textBoxOptionsSchema, textBoxOptionsString)) ||
                undefined;

            const transformationString = getImageKitTransformationString({
                canvasOptions,
                textOptions,
                textBoxOptions,
            });

            options.transformation = { pre: transformationString };
        }

        return await imageKit.upload(options);
    } catch (error) {
        logger.error(`ImageKit upload failed:, ${error}`);
        throw new Error("Failed to upload image to ImageKit");
    }
};
