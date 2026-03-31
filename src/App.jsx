import { useEffect } from 'react'
import './App.css'
import AppRoutes from './Routes'
import { useTranslation } from 'react-i18next'


function App() {

  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.dir()
  })


  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
