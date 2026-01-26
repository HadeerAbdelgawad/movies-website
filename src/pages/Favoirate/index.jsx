import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineDateRange } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { FaTrashAlt } from "react-icons/fa";
import { deleteFavorite } from '../../store/slices/favorite';


function Favoirate() {
    const favorite = useSelector((state) => state.favorite.favorite)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    


    const handleDeletFav = (movie) => {
        dispatch(deleteFavorite(movie))

    }
    const navigateToDetails = (id) => {
        navigate(`/movie-details/${id}`)
    }


    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 min-h-screen items-center'>
                {favorite.length === 0 ? (
                    <p className='col-span-4 text-gray-400 text-center'>No favorite movies yet</p>
                )
                    :
                    (favorite.map((fav) => (
                        <div key={fav.id} className='relative col-span-1 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300' >
                            <img className='w-full h-72 object-cover' src={`https://image.tmdb.org/t/p/w500/${fav.poster_path}`} alt={fav.title ? fav.title : fav.name} />
                            <div className='absolute top-0 bg-blue-950 right-0 p-2  overflow-hidden flex items-center gap-2'>
                                <p className='text-yellow-400 font-semibold'> {fav.vote_average} </p>
                            </div>
                            <div className='absolute top-0 bg-blue-950 left-0 p-2 overflow-hidden flex items-center gap-2 hover:cursor-pointer '>
                                <p className='text-yellow-400 font-semibold hover:transform hover:scale-110 hover:text-yellow-500' onClick={() => { navigateToDetails(fav.id) }}><FaRegEye />
                                </p>
                            </div>
                            <div className='relative flex flex-col gap-2 p-4'>
                                <h2 className='text-white text-xl font-bold'>{fav.title ? fav.title : fav.name}</h2>
                                {fav.adult ? <p className='text-red-500 text-sm'>Adult Content</p> : <p className='text-green-500 text-sm'>Suitable for All Audiences</p>}
                                <p className='text-gray-300 text-sm flex items-center gap-1'><MdOutlineDateRange /> {fav.release_date ? fav.release_date : fav.first_air_date}</p>
                                <div className='absolute top-0 shadow right-0 p-2  overflow-hidden flex items-center gap-2'>
                                    <p className='text-yellow-700 font-bold text-2xl hover:cursor-pointer' onClick={() => { handleDeletFav(fav) }}> <FaTrashAlt /> </p>
                                </div>
                            </div>
                        </div>
                    )
                    ))

                }
            </div>
        </>
    )
}

export default Favoirate
