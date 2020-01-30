import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
    // console.log("This is movie props:", this.props)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      // .then(res => this.setState({ movie: res.data }))
      .then((response) => {
        console.log("This is the response for in movie (check data type): ", response)
        // MOVIE GETS SET TO AN OBJECT BELOW
        this.setState({ movie: response.data })
      })
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  goToEdit = () => {
    this.props.history.push(`/update-movie/${this.props.match.params.id}`)
  }

  deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
    .then((response) => {
      console.log("This is the response from delete:", response)
      this.props.history.push('/')
    })
    .catch((error) => {
      console.log("This is an error from delete:", error.message)
    })
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button className="to-update" onClick={this.goToEdit}>Edit</button>
        <button className="delete" onClick={this.deleteMovie}>Delete</button>
      </div>
    );
  }
}
