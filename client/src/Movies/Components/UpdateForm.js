import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

function UpdateForm(props) {
    const [movieToEdit, setEdit] = useState(initialState)



    useEffect(() => {
        // console.log("these are props:", props)
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then((response) => {
                console.log("This is is response in update:", response)
                setEdit(response.data)
            })
            .catch((error) => {
                console.log("This is an axios error in update:", error)
            })
        // let selected = props.savedList.find(movie => `${movie.id}` === props.match.params.id)
        // setEdit({
        //     title: selected.title,
        //     director: selected.director,
        //     metascore: selected.metascore,
        //     stars: selected.stars
        // })
    },[props.match.params.id])

    const handleChange = (event) => {
        setEdit({
            ...movieToEdit,
            [event.target.name]: event.target.value
        })
    }

    const saveChange = () => {
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movieToEdit)
            .then((response) => {
                console.log("This is response from save change:", response)
                // Set the of movie list
                props.history.push('/')
            })
            .catch((error) => {
                console.log("This is an error from save change:", error)
            })
    }

    return (
        <div>
        <div className="movie-card">
            <h2> {movieToEdit.title} </h2>
            <div className="movie-director">
                Director: <em> {movieToEdit.director} </em>
            </div>
            <form className="movie-metascore">
                <label className="label"> Metascore:
                    <input
                    name="metascore"
                    value={movieToEdit.metascore}
                    onChange={handleChange}
                    />
                </label>
            </form>
            <h3>Actors</h3>
            { 
            movieToEdit.stars.map(star => (
                <div key={star} className="movie-star">
                    {star}
                </div>
            )) 
            }
        </div>
        <button onClick={saveChange} className="put-btn">Save Metascore</button>
        </div>
    )
}

export default UpdateForm;