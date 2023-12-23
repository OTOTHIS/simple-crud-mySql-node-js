import { Router } from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);
export default router;
