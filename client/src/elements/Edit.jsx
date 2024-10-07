import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState([]);
  const { customer_id } = useParams();

  useEffect(() => {
    axios
      .get(`/customers/${customer_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [customer_id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_customer/${customer_id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container-fluid">
      <h1>Customer</h1>
      <Link to="/customers" className="btn btn-success">
        Back
      </Link>
      {data.map((customer) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="store_id">Store ID:</label>
              <input
                value={customer.store_id}
                type="number"
                name="store_id"
                required
                onChange={(e) =>
                  setData({ ...data[0], store_id: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="store_id">First Name:</label>
              <input
                value={customer.first_name}
                type="text"
                name="first_name"
                required
                onChange={(e) =>
                  setData({ ...data[0], first_name: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="store_id">Last Name:</label>
              <input
                value={customer.last_name}
                type="text"
                name="last_name"
                required
                onChange={(e) =>
                  setData({ ...data[0], last_name: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="store_id">Email:</label>
              <input
                value={customer.email}
                type="email"
                name="email"
                required
                onChange={(e) => setData({ ...data[0], email: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="store_id">Address ID:</label>
              <input
                value={customer.address_id}
                type="number"
                name="address"
                required
                onChange={(e) =>
                  setData({ ...data[0], address_id: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        );
      })}

      {/* {data && (
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="store_id">Store ID: </label>
            <input
              value={data.store_id}
              type="text"
              name="store_id"
              required
              onChange={(e) =>
                setData([{ ...data[0], store_id: e.target.value }])
              }
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="first_name">First Name: </label>
            <input
              value={data.first_name}
              type="text"
              name="first_name"
              required
              onChange={(e) =>
                setData([{ ...data[0], first_name: e.target.value }])
              }
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="last_name">Last Name:</label>
            <input
              value={data.last_name}
              type="text"
              name="last_name"
              required
              onChange={(e) =>
                setData([{ ...data[0], last_name: e.target.value }])
              }
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">E-mail:</label>
            <input
              value={data.email}
              type="email"
              name="email"
              required
              onChange={(e) => setData([{ ...data[0], email: e.target.value }])}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="address">Address ID:</label>
            <input
              value={data.address_id}
              type="number"
              name="address"
              required
              onChange={(e) =>
                setData([{ ...data[0], address_id: e.target.value }])
              }
            />
          </div>
          <div className="form-group my-3">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button type="submit" className="btn btn-success">
              Edit
            </button>
            <button type="submit" className="btn btn-success">
              Delete
            </button>
          </div>
        </form>
      )} */}
    </div>
  );
}

export default Edit;
