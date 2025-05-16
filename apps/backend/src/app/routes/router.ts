import { Router } from "express";

import { boardRouter } from "./board.route";
import { commentRouter } from "./comment.route";
import { followRouter } from "./follow.route";
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
    {
        path: "/comment",
        router: commentRouter,
    },
    {
        path: "/follow",
        router: followRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
