import React from 'react'
import HeadlinePage from './pages/HeadlinePage'
import {  Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Articledetailpage from './Components/Articledetailpage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/headlinepage" />} />
          <Route path='/headlinepage' element={<HeadlinePage />} />
          <Route path='/article/:id' element={<Articledetailpage />} />
        </Routes>
      </BrowserRouter>    
    </>
  )
}

export default App
