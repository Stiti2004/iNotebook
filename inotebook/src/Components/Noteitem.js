import React, {useContext} from 'react';
import noteContext from '../Context/Notes/NoteContext';

export default function Noteitem(props) {
    
    const context = useContext(noteContext);
    const {deleteNote, setFormNumber, setEditFormId} = context;

    const handleDelete = () => {
        deleteNote(props.note._id);
    }

    const handleEdit = () => {
        setFormNumber(1);
        setEditFormId(props.note._id);
    }

    return (
        <div className='container'>
            <div className="card" style={{width: "18rem", backgroundColor: "#AEDEFC", borderRadius: "1rem", height: "200px", overflowY: "auto"}}>
                    <div className="card-body ">
                        <h5 className="card-title text-center">{props.note.title}</h5>
                        <p className="card-text">{props.note.description}</p>
                        <div>{props.note.tag}</div>
                        <i className="fa-solid fa-trash " onClick={handleDelete} ></i>
                        <i className="fa-solid fa-pen-to-square mx-3" onClick={handleEdit} ></i>
                    </div>
            </div>
        </div>
    )
}
