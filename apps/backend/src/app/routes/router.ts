import { Router } from "express";

import { boardRouter } from "./board.route";
import { likeRouter } from "./like.route";
import { pinRouter } from "./pin.route";
import { userRouter } from "./user.route";

const router = Router();

const routes: {
    path: string;
    router: Router;
}[] = [
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
    {
        path: "/like",
        router: likeRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
