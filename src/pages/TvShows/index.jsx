import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router';
import { getTvShowsByPage } from '../../services/movies.api';
import Card from '../../components/Card';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

function TvShows() {

    const[pageNumber, setPageNumber]= useState(1)
    const [tvShows, setTvShows] = useState([])
    const loader = useSelector((state) => state.loader.loader)

    


    const tvShowsByPage = async (pageNumber) => {
            try {
                const res = await getTvShowsByPage(pageNumber)
                console.log('tv shows by page', res);
                setTvShows(res.data.results)
            } catch (err) {
                console.log(err);
    
            }
        }

        const handleNextPagenation=()=>{
            setPageNumber(pageNumber+1)
        }
        const handlePrevPagenation=()=>{
            setPageNumber(pageNumber-1)
        }

        useEffect(()=>{
            tvShowsByPage(pageNumber)
        }, [pageNumber])

    return (
         <>
         {loader?<div className='flex justify-center items-center min-h-screen'><Loader/></div>:
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {tvShows && tvShows.map((tvShow)=>{
                    return(
                    <Card key={tvShow.id} movie={tvShow}/>
                    )
                })}
                <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center p-4'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mx-2' onClick={()=>{handlePrevPagenation()}}>Previous</button>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mx-2' onClick={()=>{handleNextPagenation()}}>Next</button>
                </div>
                
            </div>}
            

        </>
    )
}

export default TvShows
