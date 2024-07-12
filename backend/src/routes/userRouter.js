import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
import { loginUser, registerUser, getCurrentUser, getUser, addSolutionToHistory, getSolutionHistory, IncreaseLikeOfUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/register").post(upload.single("avatar"), registerUser)

router.route("/login").post(loginUser)

router.route("/current-user").get(verifyJWT , getCurrentUser)

router.route("/get-user").post(getUser)

router.route("/add-solution-to-user-submissions").post(verifyJWT, addSolutionToHistory);

router.route("/get-user-submissions").get(verifyJWT, getSolutionHistory)

router.route("/increase-user-wins").post(IncreaseLikeOfUser)

router.route("/get").get((req, res)=>{
    res.json('This is callable')
})

export default router;