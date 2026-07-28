import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
//import './App.css'
import TecnicoLayout from './tecnico/pages/TecnicoLayout'
import EmpleadoLayout from './empleado/pages/EmpleadoLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <EmpleadoLayout></EmpleadoLayout> */}
    <TecnicoLayout></TecnicoLayout>
    </>
  )
}

export default App
