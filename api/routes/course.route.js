import express from "express";
import {
  courseCreate,
  courseUpdate,
  courselist,
  courseOwned,
  courseDetail,
  courseDelete,
} from "../controllers/course.controller.js";
import upload from "../useMulter.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  courseCreate
);
router.put(
  "/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  courseUpdate
);
router.get("/all", courselist);
router.get("/owned", courseOwned);
router.get("/:id", courseDetail); //add middleware of ENroll, create order, next
router.delete("/delete/:id", courseDelete);

export default router;
