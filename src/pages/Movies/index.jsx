import React, { useEffect, useState } from 'react'
import { getMoviesByPage } from '../../services/movies.api'
import Card from '../../components/Card'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'


function Movies() {
    const [pageNumber, setPageNumber] = useState(1)
    const [movies, setMovies] = useState([])
    const loader = useSelector((state) => state.loader.loader)



    const moviesByPage = async (pageNumber) => {
        try {
            const res = await getMoviesByPage(pageNumber)
            console.log('movies by page', res);
            setMovies(res.data.results)
        } catch (err) {
            console.log(err);

        }
    }

    const handleNextPagenation = () => {
        setPageNumber(pageNumber + 1)
    }
    const handlePrevPagenation = () => {
        if (page > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    useEffect(() => {
        moviesByPage(pageNumber)
    }, [pageNumber])

    return (
        <>
            {loader ? <div className='flex justify-center items-center min-h-100 min-w-screen'><Loader /></div> :
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    {movies && movies.map((movie) => {
                        return (
                            <Card key={movie.id} movie={movie} />
                        )
                    })}
                    <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4  flex justify-center items-center p-4'>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mx-2 hover:cursor-pointer' onClick={() => { handlePrevPagenation() }}>Previous</button>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mx-2  hover:cursor-pointer' onClick={() => { handleNextPagenation() }}>Next</button>
                    </div>

                </div>
            }


        </>
    )
}

export default Movies
