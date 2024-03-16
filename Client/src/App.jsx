import { useState } from 'react'
import Landing from './Components/Landing'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from './Form'
import UpdateForm from "./UpdateForm"

function App() {

  return (
    <>
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Landing/>}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/update/:id" element={<UpdateForm/>}/>
    </Routes>
    
    </BrowserRouter>
      {/* <Home/> */}
    </>
  )
}

export default App
