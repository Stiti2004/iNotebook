import React, {useState} from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    
    const init_arr = []
    const [formNumber, setFormNumber] = useState(0);
    const [editFormId, setEditFormId] = useState("");
    const [userAuthToken, setUserAuthToken] = useState(localStorage.getItem('authToken') || null);

    const host = "http://localhost:5000"

    const [arr, setArr] = useState(init_arr);

    //Add a note
    const addNote = async (note) => {
        //API call
        const url = `${host}/api/notes/addNotes`;
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "auth-token": userAuthToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: note.title, description: note.description, tag: note.tag})
        })
        const json = await response.json();
        //Concatinating the note to the array
        setArr(arr.concat(json));
    }

    //Fetch all notes
    const fetchNotes = async () => {
        const url = `${host}/api/notes/fetchAllNotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": userAuthToken
            }
        })
        const json = await response.json();
        //Setting the arr
        setArr(json);
    }

    //Delete a note 
    const deleteNote = async (id) => {

        const url = `${host}/api/notes/deleteNotes/${id}`;
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "auth-token": userAuthToken
            }
        })
        //Removing the note from the arr
        const newNote = arr.filter((item) => {
            return (item._id !== id);
        });
        setArr(newNote);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const url = `${host}/api/notes/updateNotes/${id}`;
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "auth-token": userAuthToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, description, tag})
        })
        //Updating the particular note in the array
        setArr(prevArr => 
            prevArr.map(note =>
              note._id === id
                ? { ...note, title: title, description: description, tag: tag }
                : note
            )
          );
    }
    
    //This is similar to value = {{state: state, dataChange: dataChange}}
    return (
        <noteContext.Provider value={{arr, addNote, fetchNotes, deleteNote, editNote, formNumber, setFormNumber, editFormId, setEditFormId, setUserAuthToken}}>  
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;