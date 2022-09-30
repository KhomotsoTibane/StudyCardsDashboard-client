/*
------Edit Note component------
-Allow user to add a new note to the existing collection
-Allow a user to edit an existing note in the colletion
-Allow a user to save updates made
*/

import React, { useState } from "react";
import Note from '../components/Note'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import { useStateContext } from "../contexts/ContextProvider";
import Zoom from '@mui/material/Zoom';
import { Header } from '../components';


function EditNotes() {

  const { user } = useAuthContext()
  const { currentColor, currentMode } = useStateContext();
  // notes that will be edited which were selected by user from the home page
  const [notesToEdit] = useState(JSON.parse(localStorage.getItem("notes")))
  let navigate = useNavigate();

  // used to open the input form
  const [isExpanded] = useState(true);

  //topic for the collection
  const [topic, setTopic] = useState(notesToEdit.topic);

  //notes container that will hold all individual note items
  const [notes, setNotes] = useState(notesToEdit.item);

  // single note item comprisong of a title and contents
  const [note, setNote] = useState({
    title: "", content: ""
  });

  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  /* when the user inputs something in the form, as the user is typing the title and contents are being set respectively */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote(prevNote => { return { ...prevNote, [name]: value } });
  }

  /*set the topic when the user inputs something in the topic form*/
  const handleTopic = (event) => {
    event.preventDefault();
    setTopic(event.target.value);
  }

  /* add an individual note to the notes array when the user clicks on sumbit */
  const submitNote = (event) => {
    event.preventDefault();
    setNotes(prevNotes => { return [...prevNotes, note] });
    //reset state
    setNote({ title: "", content: "" });
  }

  /* add edited note to the notes array when the user clicks on sumbit */
  const submitEditedNote = (event) => {
    event.preventDefault();

    //add the new note to the array
    setNotes(prevNotes => { return [...prevNotes, note] });

    //delete the note that was edited so that only the latest one exists in the array
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== editIndex
      });
    });

    //reset state
    setNote({ title: "", content: "" });
    setIsEdit(false)
  }

  /* save the updated collection by sending the updated Collection to the server where it will be updated according to the id */
  const updateCollection = async (event) => {
    event.preventDefault();
    notesToEdit.item = notes;
    notesToEdit.topic = topic;

    const response = await fetch('https://studycardsserver.herokuapp.com/api/collections/update/' + notesToEdit._id, {
    // const response = await fetch('http://localhost:5000/api/collections/update/' + notesToEdit._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(notesToEdit)
    })

    if (response.ok) {
      navigate("/home")
    }
  }

  /* remove an individual note from the notes array when the user click on the delete button */
  const deleteNote = (id) => {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id
      });
    });
  }
  /* add the note title and contents into the form to allow the user to edit the details of the note*/
  const editNote = (id) => {
    setEditIndex(id)
    setIsEdit(true)
    setNote({ title: notes[id].title, content: notes[id].content })
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-white">
    <Header category="Cards" title="Edit" />
    <div className="mt-6" >
      <div className="flex flex-col  justify-center items-center">
        <form className=" flex text-center w-96">
          <input
            name="Topic"
            onChange={handleTopic}
            value={topic}
            placeholder="Title for the collection..."
            required
            className="w-60 p-1 rounded-l-md "
          />
          <button className=" text-center w-36 rounded-r-md"
            style={{ backgroundColor: currentColor, opacity: isExpanded ? 1 : 0.25 }}
            onClick={updateCollection}
            disabled={!isExpanded}
          >
            Save
          </button>
        </form>

        {(topic === "") ? null :
          <form className="relative p-4 w-96 ">
            {isExpanded && (
              <input
                name="title"
                onChange={handleChange}
                value={note.title}
                placeholder="Note Title"
                className="w-full p-1 resize-none"
              />
            )}

            <textarea
              name="content"
              onChange={handleChange}
              value={note.content}
              placeholder="Note Content"
              rows={isExpanded ? 3 : 1}
              className="w-full p-1 resize-none"
            />

            <Zoom in={isExpanded} style={{
              position: 'absolute',
              right: '10px',
              bottom: '-3px',
              color: '#fff',
              width: '36px',
              height: '36px',
              boxShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
              backgroundColor: currentColor
            }}>
              {!isEdit ? (<Fab onClick={submitNote}> <AddIcon /> </Fab>) :
                (<Fab onClick={submitEditedNote}><CheckIcon /></Fab>)}

            </Zoom>

          </form>
        }
      </div>

      {/* display individual notes items */}
      <div className="flex flex-wrap justify-center items-center">
        {(typeof notes === "undefined") ? null : notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onEdit={editNote}
              onDelete={deleteNote} />
          )
        })}
      </div>
        </div>
    </div>
  );
}
export default EditNotes;

