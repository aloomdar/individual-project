import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ActorDetails() {
  const [data, setData] = useState({});
  const { actor_id } = useParams();

  useEffect(() => {
    axios
      .get(`/movie_details/${actor_id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [actor_id]);

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
            <b>Rental Count: </b>
            {data.rental_count}
          </li>
        </ul>
      )}
    </div>
  );
}

export default ActorDetails;
