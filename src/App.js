import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import NavbarComponent from './component/NavbarComponent'
import { Home, Sukses } from './Pages'



export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/sukses' element={<Sukses />} />
        </Routes>

      </BrowserRouter>
    )
  }
}
