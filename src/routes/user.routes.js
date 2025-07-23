import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import {upload} from '../middleware/multer.middleware.js'

const router = Router();

router.route("/register")
  .get((req, res) => {
    res.send("Use POST to register a user.");
  })
  .post(
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
  );

export default router;