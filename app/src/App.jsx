import React, { useEffect, useState } from "react"
import Editor from "./components/Editor"
import Sidebar from "./components/Sidebar"
import Split from "react-split"
import { nanoid } from "nanoid"

export default function App() {
    /* set state */
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || [])
    const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || "")
    
    /* handle effects */
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    /* funcionalities */
    function createNewNote() {
        const newNote = { // create a new object
            id: nanoid(), // give it a unique ID
            body: "Type your markdown note's title here" // type your text
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        setNotes(prevNotes => {
            const updatedNote = { // define the object by ID to iterate over
                id: currentNoteId,
                body: text
            };

            const updatedNotes = [updatedNote, ...prevNotes.filter(note => note.id !== currentNoteId)];

            return updatedNotes;
        })
    }

    function deleteNote(e, noteId) {
        e.stopPropagation()
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}