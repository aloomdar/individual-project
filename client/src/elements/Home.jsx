import React from "react";
import './home.css'
import { Link } from "react-router-dom";

function Home(){
    return(
        <html>
            <div class='container'>
                <h1>Alamdar's Movie Emporium</h1>
                <div class='inner-container'>
                    <Link className="btn btn-success" to='/customers'>View Customer</Link>
                    <Link className="btn btn-success" to='/search'>Search</Link>

                </div>
            </div>
        </html>
    )
}

export default Home