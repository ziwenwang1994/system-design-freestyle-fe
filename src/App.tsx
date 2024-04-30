
import { useEffect } from 'react'
import './App.css'
import { WhiteBoard } from './components/WhiteBoard'

function App() {
  useEffect(() => {
    document.title = 'Whiteboard Freestyle';
  });

  return (
    <div className='app'>
      <WhiteBoard />
    </div>
  )
}

export default App
