import React, {useEffect} from 'react';
import Noteitem from './Noteitem';
import noteContext from '../Context/Notes/NoteContext';
import { useContext } from 'react';

export default function Note() {
  const context = useContext(noteContext);
  const {arr, fetchNotes} = context;

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line 
  },[]);
  
  return (
    <div className='row' style={{display: "flex", marginLeft: "7rem"}}>
      {arr.map((note) => {
        return (
          <div className='col-md-3 my-3'>
            <Noteitem note={note} key={note._id} />
          </div>
        );
      })}
    </div>
  )
}
