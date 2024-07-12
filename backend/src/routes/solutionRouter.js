import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { AddCommentInSolution, createSolution, getAllCommentOfSolution, getSolution } from "../controllers/solution.controller.js";

const router = Router()

router.route('/create-solution').post(verifyJWT , createSolution)

router.route('/add-comment-insolution').post(verifyJWT, AddCommentInSolution)

router.route('/get-solution').post(getSolution)

router.route('/get-allcomment-ofsolution').post(getAllCommentOfSolution)


export default router;
