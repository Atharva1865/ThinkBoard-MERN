import mongoose from "mongoose"

// Steps tp Perform:- 
// 1) create a Schema
// 2) create a model based on that schema

const noteSchema = new mongoose.Schema(
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
    { timestamps: true } // Due to { timestamps: true }, we get the "createdAt" and "modifiedAt" by Default from MongoDB.
)

const Note = mongoose.model("Note", noteSchema)

export default Note