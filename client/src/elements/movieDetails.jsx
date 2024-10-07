import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState({});
  const { film_id } = useParams();

  useEffect(() => {
    axios
      .get(`/movie_details/${film_id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [film_id]);


  return (
    <div className="container-fluid">
      <h1>Details</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
      {data && (
        <ul className="list-group">
          <li className="list-group-item">
            <b>Title: </b>
            {data.title}
          </li>
          <li className="list-group-item">
            <b>Description: </b>
            {data.description}
          </li>
          <li className="list-group-item">
            <b>Release Year: </b>
            {data.release_year}
          </li>
          <li className="list-group-item">
            <b>Rental Rate: </b>
            {data.rental_rate}
          </li>
          <li className="list-group-item">
            <b>Length: </b>
            {data.length}
          </li>
          <li className="list-group-item">
            <b>Rating: </b>
            {data.rating}
          </li>
        </ul>
      )}
    </div>
  );
}

export default Read;
