/*
------Create Note component------
-Allow a user to create a new collection
-Allow a user to enter a topic for the collection
-Allow a user add a note
-Allow user to edit a note
-Allow user to delete a note
*/

import React, { useState } from "react";
import Note from '../components/Note'
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";
import { useNotesContext } from "../hooks/useNotesContext"
import { useStateContext } from "../contexts/ContextProvider";
import { Header } from '../components';

function CreateNote(props) {

  const { dispatch } = useNotesContext()
  const { currentColor, currentMode } = useStateContext();
  const { user } = useAuthContext()

  let navigate = useNavigate();

  // used to open the input form
  const [isExpanded, setExpanded] = useState(false);

  // const [error, setError] = useState(null)

  //topic for the collection
  const [topic, setTopic] = useState("");

  //notes container that will hold all individual note items
  const [createNotes, setCreateNotes] = useState([]);

  // single note item comprisong of a title and contents
  const [note, setNote] = useState({
    title: "", content: ""
  });

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
    setCreateNotes(prevNotes => { return [...prevNotes, note] });
    //reset state
    setNote({ title: "", content: "" });
  }

  /* save the collection by sending the Collection to the server where a new item will be created and saved*/
  const saveCollection = async (e) => {
    e.preventDefault();
    console.log('saving')

    if (!user) {
      return
    }

    const response = await fetch('http://localhost:5000/api/collections/create', {
      method: 'POST',
      body: JSON.stringify({ topic, createNotes }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
      // setError(json.error)
    }

    if (response.ok) {
      setTopic('')
      setCreateNotes('')
      setNote('')
      dispatch({ type: 'CREATE_NOTES', payload: json })
      navigate("/")
    }
  }

  /*expand the form inputs*/
  const expand = () => {
    setExpanded(true);
  }

  /* remove an individual note from the notes array when the user click on the delete button */
  const deleteNote = (id) => {
    setCreateNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id
      });
    });
  }

  /* add the note title and contents into the form to allow the user to edit the details of the note*/
  //  const editNote=(id) =>{
  //    console.log(id);
  //    setNote({title: notes[id].title, content: notes[id].content})
  //   }

  //   if(!!user){
  //     return <Navigate to={"/"}/>
  // }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl dark:bg-white">
    <Header category="Cards" title="Create" />
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
            onClick={saveCollection}
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
              onClick={expand}
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
              <Fab onClick={submitNote}>
                <AddIcon />
              </Fab>
            </Zoom>
          </form>
        }

      </div>

      {/* display individual notes items */}
      <div className="flex flex-wrap justify-center items-center">
        {(typeof createNotes === "undefined") ? null : createNotes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote} />
          )
        })}
      </div>
    </div>
    </div>
  );
}
export default CreateNote;

