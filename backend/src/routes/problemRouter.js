import Router from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { AddCommentInProblem, addSolution, createProblem, getAllCommentOfProblem, getAllSolution, getProblem, mostLikedSolution, getSolutionByLike } from '../controllers/problem.controller.js';

const router = Router()

router.route('/create-problem').get(createProblem)

router.route("/get-problem").post(getProblem)

router.route("/add-commentin-problem").post(verifyJWT , AddCommentInProblem)

router.route("/get-allcomment-ofproblem").post(getAllCommentOfProblem)

router.route("/add-solution").post(verifyJWT, addSolution)

router.route("/get-all-solution").post(getAllSolution)

router.route("/get-most-like-solution").post(mostLikedSolution)

router.route("/get-solution-sorted").post(getSolutionByLike)

export default router;