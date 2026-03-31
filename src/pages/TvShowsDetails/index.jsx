import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import SkeletonLoader from '../../components/Skeleton';
import { getAllTvShowsById } from '../../services/tvShows.api';
import { set } from 'react-hook-form';
import { ImSpinner10 } from "react-icons/im";


function TvShowsDetails() {
    const [loader, setLoader] = useState(false)
    const { id } = useParams()
    const [tvShow, setTvShow] = useState({})
    const navigate = useNavigate()


    const getTvShowDetails = async () => {
        try {
            setLoader(true)
            const res = await getAllTvShowsById(id)
            console.log(id);
            console.log(res);
            setTvShow(res.data);
        } catch (err) {
            setLoader(false)
            console.log(err);
        } finally {
            setLoader(false)
        }
    }

    const displayVideos = async (movieId, mediaType) => {
        navigate(`/show-videos/${movieId}/${mediaType}`)
    }

    useEffect(() => {
        getTvShowDetails();
    }, [id])

    return (
        <>
            {loader ?
                <div className='flex justify-center items-center min-h-100'><Loader /></div>
                :
                <div className='p-6 flex flex-col justify-center items-center min-h-screen'>
                    <div className='relative bg-slate-800/50 rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row border border-gray-700/40'>
                        <img className='object-cover w-full md:w-1/3 h-64 md:h-auto' src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} alt={tvShow.title} />
                        <div className='absolute top-4 left-4 bg-slate-900/70 text-cyan-100 px-3 py-1 rounded-md overflow-hidden flex items-center gap-2'>
                            <p className='text-cyan-100 font-semibold text-sm'>Lang: {tvShow.original_language}</p>
                        </div>
                        <div className='flex flex-col gap-4 p-6 text-gray-100 md:pl-8'>
                            <h2 className='text-gray-50 text-3xl font-bold'>{tvShow.title}</h2>
                            <p className='text-gray-200 text-base'>{tvShow.overview}</p>
                            <p className='text-gray-300 text-sm'><span className='font-semibold text-cyan-300'>Release Date:</span> {tvShow.release_date}</p>
                            <p className='text-gray-300 text-sm'><span className='font-semibold text-cyan-300'>Rating:</span> {tvShow.vote_average} / 10</p>
                            <p className='text-gray-300 text-sm'><span className='font-semibold text-cyan-300'>Adult Content:</span> {tvShow.adult ? 'Yes' : 'No'}</p>

                        </div>
                    </div>
                    <button
                        onClick={() => displayVideos(tvShow.id , 'tv')}
                        className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-500 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <ImSpinner10 className="animate-spin" />
                        Show Videos
                    </button>

                </div>
            }



        </>
    )
}

export default TvShowsDetails
