import { Router } from "express";
import { getPostComments } from "../controllers/comments.controller.js";


const router=Router()

router.get("/:postId",getPostComments)


export default router