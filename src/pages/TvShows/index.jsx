import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router';
import Card from '../../components/Card';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { useTranslation } from 'react-i18next';
import SkeletonLoader from '../../components/Skeleton';
import { getTvShowsByPage } from '../../services/tvShows.api';

function TvShows() {

    const [pageNumber, setPageNumber] = useState(1)
    const [tvShows, setTvShows] = useState([])
    const loader = useSelector((state) => state.loader.loader)
    const { t } = useTranslation()

    console.log('tv shows', tvShows);
    


    const tvShowsByPage = async (pageNumber) => {
        try {
            const res = await getTvShowsByPage(pageNumber)
            console.log('tv shows by page', res);
            setTvShows(res.data.results)
        } catch (err) {
            console.log(err);

        }
    }

    const handleNextPagenation = () => {
        setPageNumber(pageNumber + 1)
    }
    const handlePrevPagenation = () => {
        setPageNumber(pageNumber - 1)
    }

    useEffect(() => {
        tvShowsByPage(pageNumber)
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
                </div> :
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-15 px-10'>
                    {tvShows && tvShows.map((tvShow) => {
                        return (
                            <Card key={tvShow.id} movie={tvShow} media_type='tv' />
                        )
                    })}
                    <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 flex justify-center items-center p-4'>
                        <button className='bg-blue-900 text-white px-4 py-2 rounded-lg mx-2 hover:cursor-pointer' onClick={() => { handlePrevPagenation() }}>{t('Previous')}</button>
                        <button className='bg-blue-900 text-white px-4 py-2 rounded-lg mx-2  hover:cursor-pointer' onClick={() => { handleNextPagenation() }}>{t('Next')}</button>
                    </div>


                </div>}


        </>
    )
}

export default TvShows
