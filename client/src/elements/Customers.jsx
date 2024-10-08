import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Customers() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("/customers")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(customer_id) {
    axios
      .delete(`/delete/${customer_id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid">
      <h3>Customers</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/add_customer">
          Add Customer
        </Link>
        <Link className="btn btn-success" to="/">
          Home
        </Link>
      </div>
      <table class="table1">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Store ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customers) => {
            return (
              <tr>
                <td>{customers.customer_id}</td>
                <td>{customers.store_id}</td>
                <td>{customers.first_name}</td>
                <td>{customers.last_name}</td>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`/edit_customer/${customers.customer_id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(customers.customer_id)}
                    className="btn mx-2 btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
