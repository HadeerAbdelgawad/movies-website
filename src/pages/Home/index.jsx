import React, { useEffect } from 'react'
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { moviesAction } from '../../store/slices/movies';
import { useFetch } from '../../hooks/useFetch';
import { useTranslation } from 'react-i18next';
import SkeletonLoader from '../../components/Skeleton';
import { peopleAction } from '../../store/slices/people';
import { IoMdMale } from "react-icons/io";
import { GiFemaleLegs } from "react-icons/gi";


function Home() {
    const { movies } = useSelector((state) => state.movies)
    const { people } = useSelector((state) => state.people)
    const [tvShows, getAll, loading, error] = useFetch()
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(moviesAction())
        dispatch(peopleAction())
        getAll()
    }, [])

    return (
        <>
            {loading ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))}
                    </div>
                </div>
            ) : (

                <div className="pt-6 pb-12 px-20">

                    {/* Hero / banner */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                        <div className="rounded-2xl bg-slate-800/50 p-8 backdrop-blur-sm border border-gray-700">
                            <h2 className="text-4xl font-bold text-gray-100 leading-tight">{t('HomePeopleTitle')}</h2>
                            <p className="mt-2 text-lg text-cyan-300">{t('HomePeopleSubTitle')}</p>
                        </div>
                    </div>

                    {/* People grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {people && people.map((person) => (
                                <div key={person.id} className='relative col-span-1 bg-slate-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300' >
                                    <img className='w-full h-72 object-cover overflow-hidden' src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt={person.title ? person.title : person.name} />

                                    <div className='relative flex flex-col gap-2 p-4'>
                                        <h2 className='text-white text-lg font-semibold flex items-center gap-2'>
                                            <span className='text-cyan-300 font-bold text-2xl hover:cursor-pointer' > {person.gender === 1 ? <GiFemaleLegs /> : <IoMdMale />} </span>
                                            {person.title ? person.title : person.name}
                                        </h2>
                                        <div className={`absolute bottom-4 ${i18n.language == 'ar' ? 'left-3' : 'right-3'} flex items-center gap-1.5 px-2 py-1 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-cyan-400`}>
                                            {person.known_for_department}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Hero / banner */}
                    <div className="max-w-7xl mx-auto pt-15  px-4 sm:px-6 lg:px-8 mb-8">
                        <div className="mb-6">
                            <h3 className="text-3xl font-semibold text-gray-100">{t('HomeMoviesTitle')}</h3>
                            <p className="text-cyan-300 mt-1">{t('HomeMoviesSubTitle')}</p>
                        </div>
                    </div>


                    {/* Movies grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {movies && movies.map((movie) => (
                                <Card movie={movie} key={movie.id} media_type='movie' />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {error ? (
                <div className="text-red-300 flex justify-center items-center py-8">{t('No Visuals To Show')}</div>
            ) : (
                <div className="pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <h3 className="text-3xl font-semibold text-gray-100">{t('Trending TV Shows To Watch')}</h3>
                        <p className="text-cyan-300 mt-1">{t('Most popular TV shows right now')}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {tvShows && tvShows.map((tvShow) => (
                            <Card movie={tvShow} key={tvShow.id} media_type='tv' />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Home
