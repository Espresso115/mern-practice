import express from "express"

import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesController.js"
// to import the controllers

const router=express.Router();

/*

router.get("/", (req, res) => {
    res.status(201).send("You fetched a note.");
});

router.post("/:id", (req, res) => {
    res.status(200).json({message:"Post created."})
});

router.put("/:id", (req, res) => {
    res.status(200).json({message:"Post updated."})
});

router.delete("/:id", (req, res) => {
    res.status(200).json({message:"Post deleted."})
});

// each of the above methods are called controllers
// the controllers become complex over time, so we will
// create separate file(s) for them

*/

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);


export default router;