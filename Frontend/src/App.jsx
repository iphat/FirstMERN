import { useState,useEffect } from 'react'
import axios from "axios"

function App() {

  const [ notes, setNotes ] = useState([])
//  console.log("hello integration")

 function fetchNotes(){
    axios.get('http://localhost:3000/notes')
    .then(res => {
      console.log(res.data);
      setNotes(res.data.note)
    })
  }
  
useEffect(() => {
  fetchNotes()
},[]);


 function handleSubmit(e){
  // console.log(e.target.elements[0].value);
  e.preventDefault()
  const {title,description} = e.target.elements;
  // console.log(title.value,description.value);

axios.post("http://localhost:3000/notes",{
      title: title.value,
      description: description.value
    })
    .then(res => {
      console.log(res.data);
      fetchNotes()
    })
}

function handleDelteNote(noteId){

  axios.delete("http://localhost:3000/notes/"+noteId)
  .then(res => {
    console.log(res.data)
    fetchNotes()
  })
}

  return (
    <>
     <form className='note-create-form' onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder='Enter Title'/>
      <input name="description" type="text" placeholder='Enter description'/>
      <button >Create Note</button>
     </form>

      <div className="notes">
        {
          notes.map(note => {
            console.log(note._id);
           return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => {handleDelteNote(note._id)}}>Delete</button>
            </div>
          })
        }

      </div>
    </>
  )
}

export default App