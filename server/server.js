const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const port = 5000;

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alamd@R99!",
  database: "sakila",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to Database");
});

//Top 5 rented movies
app.get("/top5movies", (req, res) => {
  const q = `select film.film_id, film.title, count(rental.rental_id) as rented 
  from film, rental, category, inventory, film_category 
  where film.film_id = inventory.film_id and inventory.inventory_id = rental.inventory_id 
  and film.film_id = film_category.film_id and film_category.category_id = category.category_id 
  group by film.film_id, film.title order by rented desc limit 5;`;
  db.query(q, (err, result) => {
    if (err) res.json({ message: err });
    return res.json(result);
  });
});

//Movie details
app.get("/movie_details/:id", (req, res) => {
  const film_id = req.params.id;
  const q =
    "select title, description, release_year, rental_rate, length, rating from film";

  db.query(q, [film_id], (err, result) => {
    if (err) res.json({ message: err });
    return res.json(result);
  });
});

//Top 5 Actors
app.get("/top5actors", (req, res) => {
  const q = `select actor.actor_id, actor.first_name, actor.last_name, count(film_actor.film_id) as film_count 
  from actor join film_actor on actor.actor_id = film_actor.actor_id 
  join inventory on film_actor.film_id = inventory.film_id 
  join rental on inventory.inventory_id = rental.inventory_id 
  group by actor.actor_id, actor.first_name, actor.last_name 
  order by film_count desc limit 5;`;
  db.query(q, (err, result) => {
    if (err) res.json({ message: err });
    return res.json(result);
  });
});

//Actor details
app.get("/actor_details/:id", (req, res) => {
  const id = req.params.id;
  const q = "select * from actor";
  db.query(q, [id], (err, result) => {
    if (err) res.json({ message: err });
    return res.json(result);
  });
});

//Search for film
app.get("/search/:param", (req, res) => {
  const id = req.params.param;
  const q = "select * from film where `param`=?";
  db.query(q, [param], (err, result) => {
    if (err) res.json({ message: err });
    return res.json(result);
  });
});

//Get list of customers
app.get("/customers", (req, res) => {
  const q = `select customer_id, store_id, first_name, last_name from customer`;
  db.query(q, (err, result) => {
    if (err) res.json({ message: err });
    return res.json(result);
  });
});

//Add new customer
app.post("/add_customer", (req, res) => {
  const { store_id, first_name, last_name, email, address_id } = req.body;
  const q = `insert into customer (store_id, first_name, last_name, email, address_id, active, create_date) values (?, ?, ?, ?, ?, 1, now())`;

  db.query(
    q,
    [store_id, first_name, last_name, email, address_id],
    (err, result) => {
      if (err) res.json({ message: err });
      else console.log("Added customer");
    }
  );
});

//Edit existing customer
app.put("/edit_customer/:id", (req, res) => {
  const { customer_id } = req.params.customer_id;
  const q =
    "update customer set `store_id`=?, `first_name`=?, `last_name`=?, `email`=?, `address_id`=? where customer_id=?";
  const values = [
    req.body.store_id,
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.address_id,
    customer_id,
  ];

  db.query(q, values, (err, result) => {
    if (err) return res.json({ message: err });
    return res.json({ success: "Edited successfully" });
  });
});

//Delete existing customer
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const q = `delete from customer where customer_id = ?`;
  const values = [id];

  db.query(q, [id], (err, result) => {
    if (err) res.json({ message: err });
    else if (result.affectedRows === 0)
      res.status(404).send("Customer not found");
    else res.send("Customer deleted successfully");
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
