import { uploadImageToImageKit } from "@/lib/image-kit";

import type { CreatePinType } from "@/validations/pin.validation";

import { prisma } from "@/db/prisma";

export const createPinService = async (
    file: Express.Multer.File,
    data: CreatePinType,
    user: string
) => {
    const img = await uploadImageToImageKit(file, "pins");

    return prisma.pin.create({
        data: {
            media: img.url,
            width: img.width,
            height: img.height,
            userId: user,
            boardId: data.board,
            title: data.title,
            description: data.description,
            link: data.link,
            tags: data.tags,
        },
    });
};
