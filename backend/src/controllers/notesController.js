import Note from "../models/Note.js"




export async function getAllNotes(req, res){
    // res.status(200).send("You just fetched the notes.");

    try{
        // Let MongoDB handle the sort so we always get the newest notes first.
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    }catch(error){
        console.error("Could not get all notes. ", error);
        res.status(500).json({message:"Internal server error."});
    }
}




export async function getNoteById(req, res){
    try{
        const note=await Note.findById(req.params.id);

        if(!note) return res.status(404).json({message:"Note not found."})

        res.json(note);
    }catch(error){
        console.error("Could not fetch the note. ", error);
        res.status(500).json({message:"Internal server error."});
    }
}




export async function createNote(req, res){
   // res.status(201).json({message: "Note created."});

   try {
    const {title, content}=req.body;

    if (!title?.trim() || !content?.trim()) {
        return res.status(400).json({ message: "Title and content are required." });
    }

    const note = new Note({
        title: title.trim(),
        content: content.trim()
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
   }catch(error) {
    console.log("Could not create note. ", error);
    res.status(500).json({message:"Server error."});
   }
}




export async function updateNote(req, res){
   // res.status(201).json({message: "Note updated."});

   try{
    const {title, content}=req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{
        new:true
    });

    // params.id because, it is /:id in the routes

    if(!updatedNote) return res.status(404).json({message:"Note not found."})
    // to check if not exists

    res.status(200).json({message:"Note updated successfully."});
   }catch(error){
    console.log("Could not update note. ", error);
    res.status(500).json({message:"Server error."});
   }
}




export async function deleteNote(req, res){
    // res.status(201).json({message: "Note deleted."});
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        if(!deletedNote) return res.status(404).json({message:"Note not found."});

        res.status(200).json({message:"Note deleted successfully."});
    }catch(error){
        console.log("Could not delete note. ", error);
        res.status(500).json({message:"Server error."});
    }
}
