const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const express = require("express");
const router = express.Router();
const { ObjectId } = require('mongodb');
const { body, validationResult } = require('express-validator');
//CRUD operations

//Route 1 : To add notes 
router.post("/addNotes", [body("title", "Minimum length of the title field is 3.").isLength({ min: 3 }), body("description", "Enter the text").notEmpty()], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json(errors);
    else {
        try {
            //Destructuring the info acquired from the body
            let { title, description, tag } = req.body;
            //The "ObjectId" is a class provided by MongoDB libraries that represents the unique identifier for documents in a MongoDB collection.
            //new ObjectId(req.user.id) -> Is a way to create an instance of the ObjectId type in MongoDB
            let data = await Notes.create({ title: title, user: new ObjectId(req.user.id), description: description, tag: tag });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
})

//Route 2 : To fetch a particular note, based on the ID mentioned in the URL(i.e passed as params)
router.get("/fetchNotes/:id", fetchUser, async (req, res) => {
    try {
        //req.params.id -> ID mentioned in the URL
        let data = await Notes.findById(req.params.id);
        try {
            //Checking if the ID of the user( from the auth-token ) is same as that mentioned in the user field of the "data"
            //It is necessary to convert data.user to String as it is of type  "new ObjectId()" and req.user.Id is of type String
            if (data.user.toString() === req.user.id) res.status(200).json(data);
            else res.status(401).json({ error: "Unauthorized" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
    catch (error) {
        res.status(404).json({ error: "Note not found" });
    }
})

//Route 3 : To fetch all notes
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
    try {
        //Fetching in terms of user ID
        let data = await Notes.find({ user: req.user.id });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(404).json({ error: "Notes not found" });
    }
})

//Route 4 : To update a particular note
router.put("/updateNotes/:id", fetchUser, async (req, res) => {
    try {
        let data = await Notes.findById(req.params.id);
        try {
            if (data.user.toString() === req.user.id) {
                let { title, description, tag } = req.body;
                //Creating an empty new note
                let newNote = {};
                //Adding values to only those fields that are non-empty in the body
                if (title) newNote.title = title;
                if (description) newNote.description = description;
                if (tag) newNote.tag = tag;
                //{new: true} -> Instructs function to return the updated document, rather than the original doc
                data = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
                res.status(200).json(data);
            }
            else res.status(401).json({ error: "Unauthorized" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
    catch (error) {
        res.status(404).json({ error: "Note not found" });
    }
})

//Route 5 : To delete a particular note
router.delete("/deleteNotes/:id", fetchUser, async (req, res) => {
    try {
        let data = await Notes.findById(req.params.id);
        try {
            if (data.user.toString() === req.user.id) {
                await Notes.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: "Successfully deleted the note" });
            }
            else res.status(401).json({ error: "Unauthorized" });
        } catch (error) {
            res.status(500).json({ error: "Note not found" });
        }
    }
    catch (error) {
        res.status(404).json({ error: "Note not found" });
    }
})

module.exports = router; 