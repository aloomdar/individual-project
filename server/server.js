const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const port = 5000;


let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alamd@R99!",
  database: "sakila"
});

db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log("Connected to Database");
});


//Top 5 rented movies
app.get('/top5movies', (req, res)=>{
  const q = `select film.film_id, film.title, count(rental.rental_id) as rented 
  from film, rental, category, inventory, film_category 
  where film.film_id = inventory.film_id and inventory.inventory_id = rental.inventory_id 
  and film.film_id = film_category.film_id and film_category.category_id = category.category_id 
  group by film.film_id, film.title order by rented desc limit 5;`;
  db.query(q, (err, result)=>{
    if(err) res.json({"message": err});
    return res.json(result);
  });
});

//Top 5 Actors
app.get('/top5actors', (req, res)=>{
  const q = `select a.actor_id, a.first_name, a.last_name, count(fa.film_id) as film_count 
  from actor a join film_actor fa on a.actor_id = fa.actor_id 
  join inventory i on fa.film_id = i.film_id 
  join rental r on i.inventory_id = r.inventory_id 
  group by a.actor_id, a.first_name, a.last_name 
  order by film_count desc limit 5;`;
  db.query(q, (err, result)=>{
    if(err) res.json({"message": err});
    return res.json(result);
  });
});

//Search for film
app.get('/search/:param', (req, res)=>{
  const id = req.params.param;
  const q = "select * from film where `param`=?";
  db.query(q, [param], (err, result)=>{
     if(err) res.json({"message": err});
    return res.json(result);
  })
})

//Add new customer
app.post('/add_customer', (req, res) => {
  const { store_id, first_name, last_name, email, address_id } = req.body;
  const q = `insert into customer (store_id, first_name, last_name, email, address_id, active, create_date) values (?, ?, ?, ?, ?, 1, now())`;
  
  db.query(q, [store_id, first_name, last_name, email, address_id], (err, result) => {
    if (err) res.json({"message": err})
    else console.log("Added customer")
  });
 });
  
//Edit existing customer
app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, address_id } = req.body;
  const q = `update customer SET first_name = ?, last_name = ?, email = ?, address_id = ? where customer_id = ?`;

  db.query(q, [first_name, last_name, email, address_id, id], (err, result) => {
    if (err) res.json({"message": err})
    else if (result.affectedRows === 0) res.status(404).send('Customer not found');
    else res.send('Customer updated successfully');
        
  });
});

//Delete existing customer
app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;
  const q = `delete customer where customer_id = ?`;
  
  db.query(q, [id], (err, result) => {
    if (err) res.json({"message": err})
    else if (result.affectedRows === 0) res.status(404).send('Customer not found');
    else res.send('Customer deleted successfully');
      
    });
  });
  

app.get('/search', (req, res)=>{

})

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})