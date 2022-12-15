import { useState } from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>YATA HTA</h1>
      <Link to='/sign-up'>Sign up</Link>
      <Link to='/log-in'>Log in</Link>
    </div>
  )
}

export default App
