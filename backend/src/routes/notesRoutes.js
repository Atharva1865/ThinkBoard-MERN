import express from "express"
import { createNote, deleteNote, getAllNotes, getASpecificNote, updateNote } from "../controllers/notesController.js"

const router = express.Router()

router.get("/", getAllNotes)  // The Function (getAllNotes in this case) is called Controller Function.
router.get("/:id", getASpecificNote)
router.post("/", createNote)
router.put("/:idToBeUpdated", updateNote)  // :idToBeUpdated means we are taking dynamic values of idToBeUpdated
router.delete("/:idToBeDeleted", deleteNote)

export default router