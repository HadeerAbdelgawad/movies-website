import React, { useState } from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { changeFavorite } from '../../store/slices/favorite';
import { FaRegEye } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


function Card({ movie }) {

    const favorite = useSelector((state) => state.favorite.favorite)
    const isFavorite = favorite.some(item=> item.id=== movie.id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    console.log('lang',i18n.language);
    
    console.log(favorite);


    const navigateToDetails = (id) => {
        navigate(`/movie-details/${id}`)
    }
    const handleFavChange = (movie) => {
        dispatch(changeFavorite(movie))
    }
    return (
        <>
            <div key={movie.id} className='relative col-span-1 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300' >
                <img className='w-full h-72 object-cover' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title ? movie.title : movie.name} />
                <div className='absolute top-0 bg-blue-950 right-0 p-2  overflow-hidden flex items-center gap-2'>
                    <p className='text-yellow-400 font-semibold'> {movie.vote_average} </p>
                </div>
                <div className={`absolute top-0 bg-blue-950 left-0 p-2 overflow-hidden flex items-center gap-2 hover:cursor-pointer`}>
                    <p className='text-yellow-400 font-semibold hover:transform hover:scale-110 hover:text-yellow-500' onClick={() => { navigateToDetails(movie.id) }}><FaRegEye />
                    </p>
                </div>
                <div className='relative flex flex-col gap-2 p-4'>
                    <h2 className='text-white text-xl font-bold'>{movie.title ? movie.title : movie.name}</h2>
                    {movie.adult ? <p className='text-red-500 text-sm'>${t('AdultContent')}</p> : <p className='text-green-500 text-sm'>{t('SuitableforAllAudiences')}</p>}
                    <p className='text-gray-300 text-sm flex items-center gap-1'><MdOutlineDateRange /> {movie.release_date ? movie.release_date : movie.first_air_date}</p>
                    <div className={`absolute top-0 shadow ${i18n.language=='ar'?'left-0':'right-0'} p-2  overflow-hidden flex items-center gap-2`}>
                        <p className='text-yellow-700 font-bold text-2xl hover:cursor-pointer' onClick={() => { handleFavChange(movie) }}> {isFavorite ? <FaStar /> : <CiStar />} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
