import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Testpage from './Testpage'
// import Createcolumn from './Createcolumn'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Createcolumn/>}/> */}
          <Route path='/' element={<Testpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
