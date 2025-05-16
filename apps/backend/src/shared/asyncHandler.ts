/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler = <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: RequestHandler<P, ResBody, ReqBody, ReqQuery>
) => {
    return async (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response<ResBody>,
        next: NextFunction
    ) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default asyncHandler;
