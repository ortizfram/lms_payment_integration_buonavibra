import express from "express";
import {
  courseCreate,
  courseUpdate,
  courselist,
  courseOwned,
  courseDetail,
  courseDelete,
} from "../controllers/course.controller";
import upload from "../useMulter";

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  courseCreate
);
router.put("/update/:id", courseUpdate);
router.get("/all", courselist);
router.get("/owned", courseOwned);
router.get("/:id", courseDetail);
router.post("/delete/:id", courseDelete);

export default router;
