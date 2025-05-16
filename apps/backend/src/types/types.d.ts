/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";

import type { TokenPayload } from ".";

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}
