import React from 'react'
import HeadlinePage from './pages/HeadlinePage'
import {  Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/headlinepage" />} />
          <Route path='/headlinepage' element={<HeadlinePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
