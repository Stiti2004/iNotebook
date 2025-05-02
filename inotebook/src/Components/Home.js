import React, {useContext} from 'react';
import AddNoteForm from './AddNoteForm';
import Note from './Note';
import EditNoteForm from './EditNoteForm';
import noteContext from '../Context/Notes/NoteContext';
import Navbar from './Navbar';

export default function Home() {
  const context = useContext(noteContext);
  const {formNumber} = context;

  return (
    <>
      <Navbar/>
      <div>
          {(formNumber === 0)? <AddNoteForm/> : <EditNoteForm/>}
          <Note/>
      </div>
    </>
  );
}
