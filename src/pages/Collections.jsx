import React, { useEffect, useState } from 'react';
import { Header } from '../components/index';
import { useNavigate } from "react-router-dom"
import { useNotesContext } from "../hooks/useNotesContext"
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { BsFillTrashFill } from 'react-icons/bs'

import { BiEdit, BiSlideshow } from 'react-icons/bi'

const Collections = () => {

  const { notes, dispatch } = useNotesContext()
  const { user } = useAuthContext()
  let navigate = useNavigate();

  //toggle the display property of the modal
  const [show, setShow] = useState(false)
  //determine which collection to delete
  const [deleteIndex, setDeleteIndex] = useState(null)

  //fetch all notes from the database when the page loads
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('http://localhost:5000/api/collections/', { headers: { 'Authorization': `Bearer ${user.token}` } })
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json })
      }
    }

    if (user) {
      fetchNotes()
    }

  }, [dispatch, user])

  //show the delete Note modal and set the DeleteIndex
  const handleShow = (i) => {
    console.log('clicked');
    setDeleteIndex(i)
    setShow(true)
  }

  //close the delete Note modal
  const handleClose = () => {
    setShow(false)
  }

  //when the user clicks on the view collection button, set the notes that the user will view and navigate them to the view page
  const handleView = (i) => {

    localStorage.removeItem('notes');
    localStorage.removeItem('topic');
    localStorage.setItem("notes", JSON.stringify(notes[i].item))
    localStorage.setItem("topic", JSON.stringify(notes[i].topic))
    navigate("/view")
  }

  //when the user clicks on the edit collection button, set the notes that the user will view and navigate them to the edit page
  const handleEdit = (i) => {

    localStorage.removeItem('notes');
    localStorage.removeItem('topic');
    localStorage.setItem("notes", JSON.stringify(notes[i]))
    navigate("/edit")
  }

  //when the user clicks on the delete collection button, set the notes id of the collection user wants to delete send request to the server to delete the item
  const handleDelete = async (e) => {
    e.preventDefault()
    const deleteNoteId = (notes[deleteIndex]._id)
    const response = await fetch('http://localhost:5000/api/collections/delete/' + deleteNoteId, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user.token}` },
    })
    const json = await response.json()
    if (response.ok) {
      console.log(json)
      dispatch({ type: 'DELETE_NOTES', payload: json })
      setShow(false)
    }
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl relative">
      <Header category="Page" title="Collections" />
      <table className="min-w-full">
        <thead className="bg-white border-b">
          <tr>
            <th scope="col" className=" font-medium text-gray-900 px-6 py-4 text-left">
              Title
            </th>
            <th scope="col" className=" font-medium text-gray-900 px-6 py-4 text-left">
              Created
            </th>
            <th scope="col" className=" font-medium text-gray-900 px-6 py-4 text-left">
              Updated
            </th>
            <th scope="col" className=" font-medium text-gray-900 px-6 py-4 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {notes && notes.map((collection, i) => {
            return (
              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{collection.topic}</td>
                <td className=" text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {formatDistanceToNow(new Date(collection.createdAt), { addSuffix: true })}
                </td>
                <td className=" text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {formatDistanceToNow(new Date(collection.updatedAt), { addSuffix: true })}
                </td>
                <td className=" text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-between">
                  <button onClick={() => handleView(i)} className="btn btn-primary"><BiSlideshow /></button>
                  <button onClick={() => handleEdit(i)} className=" btn-warning"><BiEdit /></button>
                  <button onClick={() => handleShow(i)} className="btn btn-danger " ><BsFillTrashFill /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>


      {/* modal */}
      {show ? (
        <div className=" fixed inset-0 top-0 left-0 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-2 rounded">
            <div
              className="border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div
                className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 className="text-xl font-medium leading-normal text-gray-800">
                  Delete
                </h5>
                <button type="button"
                  onClick={() => setShow(false)}
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                >x</button>
              </div>
              <div className="modal-body relative p-4">
                Are you sure you want to delete this collection?
              </div>
              <div
                className="flex flex-shrink-0 flex-wrap items-center justify-between p-4 border-t border-gray-200 rounded-b-md">
                <button type="button"
                  onClick={() => setShow(false)}
                  className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
                >Close</button>
                <button type="button"
                  onClick={handleDelete}
                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md ml-1">Delete</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}

export default Collections
