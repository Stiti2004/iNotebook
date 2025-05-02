import React, {useState, useContext} from 'react';
import noteContext from "../Context/Notes/NoteContext";

export default function AddNoteForm() {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    });

    const handleChange = (obj) => {
        // ... -> spread operator
        //...note means to add or overwrite the prev value of the feilds
        setNote({...note,[obj.target.name]: obj.target.value});
    }

    const handleSubmit = (evt) => {
        //To avoid page reload
        evt.preventDefault();

        addNote(note);
        setNote({title: "", description: "", tag: ""});
    }

    const handleDisable = () => {
        //evt.preventDefault();
        return (note.title.length < 3 || note.description.length === 0 || note.tag.length === 0);
    } 

    return (
        <div>
            <form className='container my-3' style={{backgroundColor: "#FFF6F6", borderRadius: "1rem"}}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label><br/>
                    <input type="text" id="title" name="title" style={{width: "30%"}} value={note.title} onChange={handleChange} minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label><br/>
                    <textarea id="description" name="description" rows="5" cols="100" value={note.description} onChange={handleChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label><br/>
                    <input type="text" id="tag" name="tag" style={{width: "15%"}} value={note.tag} onChange={handleChange} />
                </div>
                <div className='container text-center'>
                <button type="submit" disabled={handleDisable()} className="btn btn-success my-2" onClick={handleSubmit} >Add Note</button>
                </div>
            </form>
        </div>
    )
}
