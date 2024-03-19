import express from "express";
import {
  courseCreate,
  courseUpdate,
  courselist,
  courseOwned,
  courseDetail,
  courseDelete,
  courseEnroll,
} from "../controllers/course.controller.js";
import upload from "../useMulter.js";
import { checkEnroll, auth } from "../middleware/auth.js";
const router = express.Router();

// create
router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  courseCreate
);
// update
router.put(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  courseUpdate
);
// list all
router.get("/all", auth, courselist);
// list owned
router.get("/owned", courseOwned);
// list 1 from id
router.get("/:id/fetch", courseDetail);
// course detail
router.get("/:id", auth, courseDetail); //add middleware of ENroll, create order, next
// delete
router.delete("/delete/:id", courseDelete);
// enroll
router.get("/enroll/:id", courseEnroll);

export default router;
