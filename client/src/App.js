import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Top5m from './elements/t5m'
import Top5a from './elements/t5a'
import Home from './elements/Home'
import Customers from './elements/Customers'
import Create from './elements/Create'
import Search from './elements/Search'


/* 
Route paths are endpoints
This means that I can make buttons redirect to that route created in server.js
That opens a new page
*/
function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<body><Home /><Top5a /><Top5m /></body>} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/add_customer' element={<Create />} />
        <Route path='/search' element={<Search />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App