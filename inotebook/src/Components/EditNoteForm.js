import React, {useContext, useState, useEffect} from 'react';
import noteContext from '../Context/Notes/NoteContext';

export default function EditNoteForm() {

    const [editNoteVal, setEditNoteVal] = useState({title: "", description: "", tag: ""})

    const context = useContext(noteContext);
    const {editFormId, arr, editNote, setFormNumber} = context;

    useEffect(() => {
        for (let index = 0; index < arr.length; index++) {
        if(arr[index]._id === editFormId) {
            setEditNoteVal({title: arr[index].title, description: arr[index].description, tag: arr[index].tag});
            break;
        }   
        // eslint-disable-next-line     
    }}, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        editNote(editFormId, editNoteVal.title, editNoteVal.description, editNoteVal.tag);
        setFormNumber(0);
    }

    const handleChange = (obj) => {
        setEditNoteVal({...editNoteVal,[obj.target.name]: obj.target.value});
    }

    const handleDisable = () => {
        return (editNoteVal.title.length < 3 || editNoteVal.description.length === 0 || editNoteVal.tag.length < 0);
    }

    return (
        <div>
            <form className='container my-3' style={{ backgroundColor: "#FFF6F6", borderRadius: "1rem" }}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label><br />
                    <input type="text" id="title" name="title" style={{ width: "30%" }} value={editNoteVal.title} onChange={handleChange} minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label><br />
                    <textarea id="description" name="description" rows="5" cols="100" value={editNoteVal.description} onChange={handleChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label><br />
                    <input type="text" id="tag" name="tag" style={{ width: "15%" }} value={editNoteVal.tag} onChange={handleChange} />
                </div>
                <div className='container text-center'>
                    <button type="submit" className="btn btn-success my-2" disabled={handleDisable()} onClick={handleSubmit} >Edit Note</button>
                </div>
            </form>
        </div>
    )
}
