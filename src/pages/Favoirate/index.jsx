import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineDateRange } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { FaTrashAlt } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { deleteFavorite } from '../../store/slices/favorite';
import toast from 'react-hot-toast';
import i18next from 'i18next';


function Favoirate() {
    const favorite = useSelector((state) => state.favorite.favorite)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDeletFav = (movie) => {
        try {
            dispatch(deleteFavorite(movie))
            toast.success('Item Deleted From Favorite')
        } catch (err) {
            toast.error(err)
        }
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
                    favorite.map((fav) => (
                        <div key={fav.id} className='relative col-span-1 bg-slate-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300' >
                            <img className='w-full h-72 object-cover' src={`https://image.tmdb.org/t/p/w500/${fav.poster_path}`} alt={fav.title ? fav.title : fav.name} />
                            <div className='absolute top-3 right-3 bg-cyan-600 text-white px-2 py-1 rounded-md overflow-hidden flex items-center gap-2'>
                                <p className='text-sm font-semibold'> {fav.vote_average} </p>
                            </div>
                            <div className='absolute top-3 left-3 bg-slate-900/60 text-cyan-300 p-2 rounded-md overflow-hidden flex items-center gap-2 hover:cursor-pointer '>
                                <p className='text-lg font-semibold hover:scale-110' onClick={() => { navigateToDetails(fav.id) }}><FaRegEye />
                                </p>
                            </div>
                            <div className='relative flex flex-col gap-2 p-4'>
                                <h2 className='text-white text-xl font-bold'>{fav.title ? fav.title : fav.name}</h2>
                                <div className={`absolute bottom-4 ${i18next.language == 'ar' ? 'left-3' : 'right-3'} flex items-center gap-1.5 px-2 py-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-cyan-400`}>
                                    {fav.media_type === 'tv' ? (
                                        <><MdLiveTv className="text-sm" /> TV SERIES</>
                                    ) : (
                                        <><MdLocalMovies className="text-sm" /> MOVIE</>
                                    )}
                                </div>
                                {fav.adult ? <p className='text-rose-400 text-sm'>Adult Content</p> : <p className='text-cyan-300 text-sm'>Suitable for All Audiences</p>}
                                <p className='text-gray-300 text-sm flex items-center gap-1'><MdOutlineDateRange /> {fav.release_date ? fav.release_date : fav.first_air_date}</p>
                                <div className={`absolute top-3 ${i18next.language == 'ar' ? 'left-3' : 'right-3'} p-2 overflow-hidden flex items-center gap-2`}>
                                    <p className='text-cyan-300 font-bold text-2xl hover:cursor-pointer' onClick={() => { handleDeletFav(fav) }}> <FaTrashAlt /> </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Favoirate
