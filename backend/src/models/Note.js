import mongoose from "mongoose";

// 1. cretae a schema
// 2. create model based of schema

// the note will have 3 fields: title, content, timestamps
const noteSchema=new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },

    },
    { timestamps: true } //created-at, updated-at
);

const Note = mongoose.model("Note", noteSchema);
// create a model based on the schema

export default Note;