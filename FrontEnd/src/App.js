import React from 'react'
import Navbar from './NavBar';
import Deals from './components/Deals'

const App = (props) => {
  return (
    <div>
      <Deals />
      <Navbar/>
    </div>
  )
}

export default App;