import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Top5m from './elements/t5m'
import Top5a from './elements/t5a'
import Edit from './elements/Edit'
import Read from './elements/Read'
import Create from './elements/Create'
import Home from './elements/Home'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<body><Home /><Top5a /><Top5m /></body>} />
        <Route path='/add_user' element={<Create />} />
        <Route path='/top5' element={<div><Top5a /><Top5m /></div>} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/read/:id' element={<Read />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App