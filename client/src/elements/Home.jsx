import React from "react";
import './home.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function Home(){
    return(
        <html>
            <div class='container'>
                <h1>Alamdar's Movie Emporium</h1>
                <div class='inner-container'>
                    <a href="/add_user">
                    <button>Add User</button> 
                    </a>
                    <a href="/search">
                    <button>Search</button> 
                    </a>
                </div>
            </div>
        </html>
    )
}

export default Home