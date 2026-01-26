import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router'

function Layout() {
    return (
    <>
    <div className='bg-slate-900 min-h-100vh'>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    
    </>
        
    )
}

export default Layout
