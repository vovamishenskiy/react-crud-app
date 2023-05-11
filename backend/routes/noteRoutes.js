import express from "express"
import { getNoteById, getNotes, createNote, deleteNote, updateNote } from "../controllers/noteController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").get(protect, getNotes)
router
    .route("/:id")
    .get(getNoteById)
    .delete(protect, deleteNote)
    .put(protect, updateNote)
router.route("/create").post(protect, createNote)

export default router