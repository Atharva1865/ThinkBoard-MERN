import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI"
import api from "../lib/axios"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"
import { LoaderIcon } from "lucide-react"

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Using Fetch api ->
        // const res = await fetch("http://localhost:5001/api/notes")
        // const data = await res.json()
        // console.log(data)

        // Using Axios ->
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error Fetching Notes")
        console.log(error)
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto mt-6 p-4">
        {loading && <div className="min-h-[50vh] flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>}

        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              // Syntax	Meaning (Reason why we gave () after =>, instead of {})
              // => (something)	Implicit return
              // => { something }	Block body (needs return)
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}

          </div>
        )}
      </div>

    </div>
  )
}

export default HomePage