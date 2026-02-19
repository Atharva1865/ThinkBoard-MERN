import { Link } from "react-router"
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { formatDate } from "../lib/utils"
import api from "../lib/axios"
import toast from "react-hot-toast"

const NoteCard = ({ note, setNotes }) => {
    const handleDelete = async (e, id) => {
        e.preventDefault() // To get rid of the Navigation behavior -> If we click anywhere on the card, we go to /note/${note._id}, but we dont want this to happen in case when we click delete icon, so we will prevent this default behavior for delete icon

        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id)) // To get rid of the Deleted Note & update the UI
            toast.success("Note deleted successfully")
        } catch (error) {
            console.log("Error in handleDelete", error)
            toast.error("Failed to delete note")
        }
    }

    return (
        <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>  {/*text-error -> To give red color to delete icon*/}
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default NoteCard