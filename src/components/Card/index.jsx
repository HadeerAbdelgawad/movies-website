import React, { useState } from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { changeFavorite } from '../../store/slices/favorite';
import { FaRegEye } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';


function Card({ movie , media_type }) {

    const favorite = useSelector((state) => state.favorite.favorite)
    const isLoggin = useSelector((state) => state.auth.isLoggedin)
    const isFavorite = favorite.some(item => item.id === movie.id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    console.log('lang', i18n.language);

    console.log(favorite);


    const navigateToDetails = (id) => {
        if(media_type === 'tv'){
            navigate(`/tv-shows-details/${id}`)
        } else {
            navigate(`/movie-details/${id}`)
        }
    }

    const handleFavChange = (movie) => {
        try {
            dispatch(changeFavorite(movie))
            toast.success('Item Added To Favorite')
        } catch (err) {
            toast.error(err)
        }
    }
    return (
        <>
            <div key={movie.id} className='relative col-span-1 bg-slate-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300' >
                <img className='w-full h-72 object-cover overflow-hidden' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path }` || `https://image.tmdb.org/t/p/w500/${movie.profile_path}`} 
                    alt={movie.title ? movie.title : movie.name} 
                />
                <div className='absolute top-3 right-3 bg-cyan-600 text-white px-2 py-1 rounded-md overflow-hidden flex items-center gap-2'>
                    <p className='text-sm font-semibold'> {movie.vote_average} </p>
                </div>
                <div className={`absolute top-3 left-3 bg-slate-900/60 text-cyan-300 p-2 rounded-md overflow-hidden flex items-center gap-2 hover:cursor-pointer`}>
                    <p className='text-lg font-semibold hover:scale-110' onClick={() => { navigateToDetails(movie.id) }}><FaRegEye />
                    </p>
                </div>
                <div className='relative flex flex-col gap-2 p-4'>
                    <h2 className='text-white text-lg font-semibold'>{movie.title ? movie.title : movie.name}</h2>
                    {/* <div className='w-10 py-1 rounded-md text-center justify-center items-center bg-cyan-500 text-white font-mono'>{movie.media_type==='tv'?<span><MdLiveTv /></span>:<span><MdLocalMovies /></span>}</div> */}
                    {/* Enhanced Media Type Badge */}
                    <div className={`absolute bottom-4 ${i18n.language == 'ar' ? 'left-3' : 'right-3'} flex items-center gap-1.5 px-2 py-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-cyan-400`}>
                        {(movie.media_type === 'tv' || media_type === 'tv') ? (
                            <><MdLiveTv className="text-sm" /> TV SERIES</>
                        ) : (
                            <><MdLocalMovies className="text-sm" /> MOVIE</>
                        )}
                    </div>
                    {movie.adult ? <p className='text-rose-400 text-sm'>${t('AdultContent')}</p> : <p className='text-cyan-300 text-sm'>{t('SuitableforAllAudiences')}</p>}
                    <p className='text-gray-300 text-sm flex items-center gap-1'><MdOutlineDateRange /> {movie.release_date ? movie.release_date : movie.first_air_date}</p>
                    {isLoggin ?
                        <div className={`absolute top-3 ${i18n.language == 'ar' ? 'left-3' : 'right-3'} pt-2 ps-4 overflow-hidden flex items-center gap-2`}>
                            <p className='text-cyan-300 font-bold text-2xl hover:cursor-pointer' onClick={() => { handleFavChange(movie) }}> {isFavorite ? <FaStar /> : <CiStar />} </p>
                        </div>
                        : ''}

                </div>
            </div>
        </>
    )
}

export default Card
