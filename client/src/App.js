import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Top5m from './elements/t5m'
import Top5a from './elements/t5a'
import Home from './elements/Home'
import Customers from './elements/Customers'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<body><Home /><Top5a /><Top5m /></body>} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/top5' element={<div><Top5a /><Top5m /></div>} />
        <Route path=''/>
      </Routes>
    </BrowserRouter>
  )
}

export default App