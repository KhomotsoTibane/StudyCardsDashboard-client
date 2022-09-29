import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useStateContext } from "../contexts/ContextProvider";


const Note = (props) => {

  const { currentColor, currentMode } = useStateContext();
  function handleDelete() { props.onDelete(props.id) }
  function handleEdit() { props.onEdit(props.id) }

  return (
    <div className="rounded-md p-2 w-56 m-4 float-left  bg-white shadow-xl">
      <h1 className="mb-1">{props.title}</h1>
      <p className="mb-2 whitespace-pre-wrap">{props.content}</p>
      <button className="float-right mr-2 w-8 h-8 cursor-pointer"
        
        onClick={handleDelete}
      >
        <DeleteIcon style={{ color: currentColor }} />
      </button>
      <button className="float-right mr-2 w-8 h-8 cursor-pointer"
     
        onClick={handleEdit}>
        <EditIcon style={{ color: currentColor }} />
      </button>
    </div>
  );
}

export default Note
