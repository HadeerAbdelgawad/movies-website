import React from 'react'
import { useNavigate } from 'react-router'

function NotFound() {
    const navigate= useNavigate()
    return (
        <div className=' flex flex-col justify-center items-center gap-4 h-screen bg-gray-600 text-white'>
            <h1 className='text-5xl font-bold mask-conic-from-neutral-100'>404 - Not Found</h1>
            <button className='rounded-2xl bg-gray-800 px-3 py-4 text-2xl hover:cursor-pointer hover:shadow-lg hover:shadow-gray-500 hover:bg-gray-900'
            onClick={()=>{navigate('/')}}>Back To Home</button>
        </div>
    )
}

export default NotFound
