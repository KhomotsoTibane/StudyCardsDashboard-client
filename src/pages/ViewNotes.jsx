/*
------View Notes Page------
-Allow user to view the notes in a slideshow format
-get notes from localhost
*/

import React, { useState, useEffect } from 'react'
import { FlashcardArray } from "react-quizlet-flashcard";
import { Header } from '../components';

function ViewNotes() {

  // the collection currently stored in the local storage that will be used for the slideshow
  const [flashcards] = useState(JSON.parse(localStorage.getItem("notes")))

  //the quizlet flashcard package requires a specific key value pair, so this state will hold the new notes with the changed key value pairs
  const [slideNotes, setSlideNotes] = useState()

  //the topic of the collection from local storage
  const topic = JSON.parse(localStorage.getItem("topic"))

  const [show, setShow] = useState(true)

  //this function renames the key value pairs of the flashcards in order to make it compatible with the requirements of 'FlashcardArray' package

    const rename = () => {
      let i;
      for (i = 0; i < flashcards.length; i++) {
        flashcards[i].front = flashcards[i]['title'];
        flashcards[i].back = flashcards[i]['content'];
        delete flashcards[i].title;
        delete flashcards[i].content;
      }
      setSlideNotes(flashcards)
      setShow(false)
    }
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Cards" title={`${topic} flashcards`} />
      <div className="flex flex-col items-center">
        {(typeof slideNotes === "undefined") ? null : <FlashcardArray cards={slideNotes} />}
        { show ? <button onClick={rename}>View</button> : null}
      </div>
    </div>
  )
}
export default ViewNotes
