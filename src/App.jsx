import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './Routes'
import { useTranslation } from 'react-i18next'

function App() {

  const { t, i18n } = useTranslation()

  useEffect(()=>{
    document.documentElement.dir=i18n.dir()
  })


  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
