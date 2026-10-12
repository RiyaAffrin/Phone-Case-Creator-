import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'
import './css/theme.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCar title='Cutie Case | Design' />
    },
    {
      path:'/customcars',
      element: <ViewCars title='Cutie Case | My Cases' />
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='Cutie Case | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='Cutie Case | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App