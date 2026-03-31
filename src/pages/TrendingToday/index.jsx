import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getTrendingMoviesToday, getTrendingTVShowsToday } from '../../services/trendingToday'
import SkeletonLoader from '../../components/Skeleton'
import Card from '../../components/Card'
import { Link } from 'react-router'

function TrendingToday() {
    const [pageNumber, setPageNumber] = useState(1)
    const [activeSection, setActiveSection] = useState('movies')
    let [trendingMoviesToday, setTrendingMoviesToday] = useState([])
    let [trendingTVShowsToday, setTrendingTVShowsToday] = useState([])
    const loader = useSelector((state) => state.loader.loader)
    const { t } = useTranslation()

    const displayTrendingMovies = async (pageNumber) => {
        try {
            const res = await getTrendingMoviesToday(pageNumber)
            console.log('Trending Movies Today:', res);
            setTrendingMoviesToday(res.data.results)
        } catch (err) {
            console.log(err);

        }
    }

    const displayTrendingTVShows = async (pageNumber) => {
        try {
            const res = await getTrendingTVShowsToday(pageNumber)
            console.log('Trending TV Shows Today:', res);
            setTrendingTVShowsToday(res.data.results)
        } catch (err) {
            console.log(err);

        }
    }


    const handleNextPagenation = () => {
        setPageNumber(pageNumber + 1)
    }
    const handlePrevPagenation = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }


    useEffect(() => {
        displayTrendingMovies(pageNumber)
        displayTrendingTVShows(pageNumber)
    }, [pageNumber])

    return (
        <>

            {loader ?
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))}
                    </div>
                </div>
                :
                <div className="pt-6 pb-12">
                    {/* Hero / banner */}
                    <div className="max-w-7xl justify-center items-center gap-2 text-center mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                        <div className="flex justify-center items-center gap-3 bg-slate-900/60 p-2 rounded-xl border border-gray-700 backdrop-blur-md">
                            <button
                                onClick={() => setActiveSection('movies')}
                                className={`flex-1 px-5 py-2 rounded-lg transition-all duration-300 ${activeSection === 'movies'
                                    ? 'bg-cyan-500 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                                    }`}
                            >
                                {t('trendingMovies')}
                            </button>

                            <button
                                onClick={() => setActiveSection('tvShows')}
                                className={`flex-1 px-5 py-2 rounded-lg transition-all duration-300 ${activeSection === 'tvShows'
                                    ? 'bg-cyan-500 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                                    }`}
                            >{t('trendingTVShows')}
                            </button>

                        </div>
                    </div>

                    {activeSection === 'movies' &&
                        (<div id='trending-movies' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-15 px-10 '>
                            {trendingMoviesToday && trendingMoviesToday.map((movie) => {
                                return (
                                    <Card key={movie.id} movie={movie} media_type="movie" />
                                )
                            })}
                            <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 flex justify-center items-center p-4'>
                                <button className='bg-blue-900 text-white px-4 py-2 rounded-lg mx-2 hover:cursor-pointer' onClick={() => { handlePrevPagenation() }}>{t('Previous')}</button>
                                <button className='bg-blue-900 text-white px-4 py-2 rounded-lg mx-2  hover:cursor-pointer' onClick={() => { handleNextPagenation() }}>{t('Next')}</button>
                            </div>

                        </div>)}

                    {activeSection === 'tvShows' &&
                        (<div id='trending-tvShows' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-15 px-10 '>
                            {trendingTVShowsToday && trendingTVShowsToday.map((show) => {
                                return (
                                    <Card key={show.id} movie={show} media_type="tv" />
                                )
                            })}
                            <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 flex justify-center items-center p-4'>
                                <button className='bg-blue-900 text-white px-4 py-2 rounded-lg mx-2 hover:cursor-pointer' onClick={() => { handlePrevPagenation() }}>{t('Previous')}</button>
                                <button className='bg-blue-900 text-white px-4 py-2 rounded-lg mx-2  hover:cursor-pointer' onClick={() => { handleNextPagenation() }}>{t('Next')}</button>
                            </div>

                        </div>)}
                </div>
            }
        </>
    )
}

export default TrendingToday
