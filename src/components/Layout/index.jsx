import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Outlet } from 'react-router'

function Layout() {
    return (
    <>
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-900 to-slate-800 text-gray-100">
        <Navbar />
        <main className="min-h-[100vh]">
            <Outlet />
        </main>
        <Footer />
    </div>
    
    </>
        
    )
}

export default Layout
