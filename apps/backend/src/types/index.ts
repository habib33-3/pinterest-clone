import type { JwtPayload } from "jsonwebtoken";

type Meta = {
    page: number;
    limit: number;
    total: number;
};

export type ApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string | null;
    meta?: Meta;
    data?: T | null;
};

export type TokenPayload = {
    id: string;
    email: string;
} & JwtPayload;
