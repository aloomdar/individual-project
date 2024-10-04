import React from "react";
import './home.css'

function Home(){
    return(
        <html>
            <div class='container'>
                <h1>Alamdar's Movie Emporium</h1>
                <div class='inner-container'>
                    <a href="/add_customer">
                    <button className='btn btn-success'>Add Customer</button> 
                    </a>
                    <a href="/search">
                    <button className='btn btn-success'>Search</button> 
                    </a>
                </div>
            </div>
        </html>
    )
}

export default Home