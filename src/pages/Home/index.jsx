import React, { useEffect, useState } from 'react'
import { getAllMovies, getAllTvShows } from '../../services/movies.api'
import Card from '../../components/Card';
import { ImSpinner10 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { moviesAction } from '../../store/slices/movies';
import { tvShowsAction } from '../../store/slices/tvShows';
import { useFetch } from '../../hooks/useFetch';
import { useTranslation } from 'react-i18next';



function Home() {

    // const [movies, setMovies] = useState([])
    // const loader= useSelector((state)=>state.loader.loader)

    // const allMovies = async () => {
    //         try {
    //         const res = await getAllMovies()
    //         console.log('movies', res.data.results);
    //         setMovies(res.data.results)

    //     } catch (err) {
    //         console.log(err);

    //     }
    // }

    // const [tvShows, setTvShows] = useState([])


    // const allTvShows = async () => {
    //     try {
    //         const res = await getAllTvShows()
    //         console.log('tvShows', res.data.results);
    //         setTvShows(res.data.results)

    //     } catch (err) {
    //         console.log(err);

    //     }
    // }

    const { loader, movies } = useSelector((state) => state.movies)
    // const { tvShows } = useSelector((state) => state.tvShows)
    const [tvShows, getAll, loading, error] = useFetch()
    console.log('tvShows', tvShows);

    const {t , i18n} = useTranslation()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(moviesAction())
        getAll()
        // dispatch(tvShowsAction())
        // allMovies()
        // allTvShows()
    }, [])

    return (
        <>
            {loading ? <div className='flex justify-center items-center min-h-screen'><Loader /></div> :
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                        <div className='
                            relative
                            
                            before:content-[""] before:absolute before:top-0
                            before:left-0 
                            before:w-50
                            before:h-0.5
                            before:bg-gray-600 

                            after:content-[""] after:absolute after:bottom-0
                            after:left-0 
                            after:w-70
                            after:h-0.5
                            after:bg-gray-600 
                            p-2 mb-4
                            '>
                            <p className='text-gray-300 text-3xl '>{t('HomeMoviesTitle')}</p>
                            <p className='text-blue-500 text-lg py-3'>{t('HomeMoviesSubTitle')}</p>
                        </div>

                        {
                            movies && movies.map((movie) => {
                                return (
                                    <Card movie={movie} key={movie.id} />
                                )
                            })
                        }

                    </div>
                </div>}

            {error ? <div className='text-red-300 flex justify-center items-center'> No Visuals To Show</div> :
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    <div className='
                            relative
                            
                            before:content-[""] before:absolute before:top-0
                            before:left-0 
                            before:w-50
                            before:h-0.5
                            before:bg-gray-600 

                            after:content-[""] after:absolute after:bottom-0
                            after:left-0 
                            after:w-70
                            after:h-0.5
                            after:bg-gray-600 
                            p-2 mb-4
                            '>
                        <p className='text-gray-300 text-3xl '>Trending TV Shows To Watch</p>
                        <p className='text-blue-500 text-lg py-3'>Most popular TV shows right now</p>
                    </div>

                    {
                        tvShows && tvShows.map((tvShow) => {
                            return (
                                <Card movie={tvShow} key={tvShow.id} />
                            )
                        })}
                </div>
            }


        </>



    )
}

export default Home
