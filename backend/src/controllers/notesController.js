import Note from "../models/Note.js"

export const getAllNotes = async (_, res) => {  // As we are never using req, we can skip it using an Underscore(_)
    try {
        const notes = await Note.find().sort({ createdAt: -1 })  // Due to -1 in sort, we get the Newest/latest First
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getASpecificNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)

        if (!note) return res.status(404).json({ message: "Note Not Found" })

        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getASpecificNote controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const note = new Note({ title, content })

        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error in createNote controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.idToBeUpdated, { title, content }, { new: true })

        if (!updatedNote) return res.status(404).json({ message: "Note Not Found" })

        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error in updateNote controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.idToBeDeleted)

        if (!deletedNote) return res.status(404).json({ message: "Note Not Found" })

        res.status(200).json({ message: "Note Deleted Successfully" })
    } catch (error) {
        console.error("Error in deleteNote controller", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}