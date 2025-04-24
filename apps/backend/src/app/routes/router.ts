import { Router } from "express";

import { pinRouter } from "./pin.route";
import { userRouter } from "./user.route";

const router = Router();

const routes = [
    {
        path: "/user",
        router: userRouter,
    },
    {
        path: "/pin",
        router: pinRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
