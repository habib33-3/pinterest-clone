import { Router } from "express";

import { boardRouter } from "./board.route";
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

    {
        path: "/board",
        router: boardRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
