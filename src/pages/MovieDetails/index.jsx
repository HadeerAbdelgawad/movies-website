import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getMovieById } from '../../services/movies.api'
import { ImSpinner10 } from "react-icons/im";
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';


function MovieDetails() {

    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const loader= useSelector((state)=>state.loader.loader)


    const getMovieDetails = async () => {
        try {
            const res = await getMovieById(id)
            console.log(id);
            console.log(res);
            setMovie(res.data);
        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        getMovieDetails();
    }, [id])

    return (
        <>
        {loader?
         <div className='flex justify-center items-center min-h-screen'><Loader/></div>
        :
         <div className='p-4 flex justify-center items-center'>
                <div className='relative bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-4xl w-full flex flex-col md:flex-row'>
                    <img className='object-cover h-150' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <div className='absolute top-0 bg-blue-950 left-0 p-2  overflow-hidden flex items-center gap-2'>
                        <p className='text-yellow-400 font-semibold'>Lang : {movie.original_language} </p>
                    </div>
                    <div className='flex flex-col gap-4 p-6 text-gray-300'>
                        <h2 className='text-white text-3xl font-bold'>{movie.title}</h2>
                        <p className='text-gray-300 text-lg'>{movie.overview}</p>
                        <p className='text-gray-400 text-md'><span className='font-semibold text-blue-400'>Release Date:</span> {movie.release_date}</p>
                        <p className='text-gray-400 text-md'><span className='font-semibold text-blue-400'>Rating:</span> {movie.vote_average} / 10</p>
                        <p className='text-gray-400 text-md'><span className='font-semibold text-blue-400'>Adult Content:</span> {movie.adult ? 'Yes' : 'No'}</p>

                    </div>
                </div>

            </div>
        }
           


        </>
    )
}

export default MovieDetails
