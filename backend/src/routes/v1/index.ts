import express, {Router} from "express";
import authRoute from "./auth.route"
const router: Router = express.Router();


router.use('/v1', authRoute)

export default router;