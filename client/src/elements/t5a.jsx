import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Top5a() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/top5actors")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid">
      <h3 className="header">Top 5 Actors</h3>
      <table className="table1">
        <thead>
          <tr>
            <th>Actor ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Number of Films</th>
          </tr>
        </thead>
        <tbody>
          {data.map((top5actors) => {
            return (
              <tr>
                <td>{top5actors.actor_id}</td>
                <td>{top5actors.first_name}</td>
                <td>{top5actors.last_name}</td>
                <td>{top5actors.film_count}</td>
                <td>
                  <Link to={`/actor_details/${top5actors.actor_id}`}>
                    Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Top5a;
