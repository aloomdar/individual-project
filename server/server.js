const express = require('express')
const mysql = require('mysql2')

const app = express()

const port = 5000


let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Alamd@R99!",
    database: "sakila"
})

db.connect((err)=>{
    if(err){
        throw err
    }
    console.log("Connected to Database")
})


//Top 5 rented movies
app.get('/top5movies', (req, res)=>{
    const q = 'select film.film_id, film.title, count(rental.rental_id) as rented from film, rental, category, inventory, film_category where film.film_id = inventory.film_id and inventory.inventory_id = rental.inventory_id and film.film_id = film_category.film_id and film_category.category_id = category.category_id group by film.film_id, film.title order by rented desc limit 5;';
    db.query(q, (err, result)=>{
        if(err) res.json({"message": "Server Error"});
        return res.json(result);
    });
});

//Top 5 Actors
app.get('/top5actors', (req, res)=>{
    const q = 'SELECT a.actor_id, a.first_name, a.last_name, COUNT(fa.film_id) AS film_count FROM actor a JOIN film_actor fa ON a.actor_id = fa.actor_id JOIN inventory i ON fa.film_id = i.film_id JOIN rental r ON i.inventory_id = r.inventory_id GROUP BY a.actor_id, a.first_name, a.last_name ORDER BY film_count DESC LIMIT 5;'
    db.query(q, (err, result)=>{
        if(err) res.json({"message": "Server Error"});
        return res.json(result);
    });
});

//Search for film
app.get('/search/:param', (req, res)=>{
    const id = req.params.param;
    const q = "select * from film where `param`=?";
    db.query(q, [param], (err, result)=>{
        if(err) res.json({message: "Server error"});
        return res.json(result);
    })
})

// app.get('/search-by-actor', (req, res)=>{
//     const searchTerm = req.query.term;
//     if(!searchTerm){
//         return res.json(400)
//         .json({error: "Enter Search Term"})
//     }
//     const q = `select film.title, actor.first_name, actor.last_name 
//     from film
//     join film_actor on film.film_id = film_actor.film_id
//     join actor on film_actor.actor_id = actor.actor_id
//     where actor`
// })

//Add new customer
app.post('/add_user', (req, res)=>{
    q = 'insert into customer (`first_name`, `last_name`, `email`, `address`) values (?)'
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.address,
    ]
    db.query(q, values, (err, result)=>{
        if(err) return res.json({message:'Something went wrong. Could not insert new customer ' + err})
        return res.json({sucess: "Successfully added new customer"})
    })
})

app.get('/search', (req, res)=>{

})

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})