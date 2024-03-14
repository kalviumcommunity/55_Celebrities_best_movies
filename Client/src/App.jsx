import { useState } from 'react'
import Landing from './Components/Landing'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from './Form'

function App() {

  return (
    <>
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Landing/>}/>
      <Route path="/form" element={<Form/>}/>
    </Routes>
    
    </BrowserRouter>
      {/* <Home/> */}
    </>
  )
}

export default App
