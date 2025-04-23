import { Router } from "express";

import { userRouter } from "./user.route";

const router = Router();

const routes = [
    {
        path: "/user",
        router: userRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
