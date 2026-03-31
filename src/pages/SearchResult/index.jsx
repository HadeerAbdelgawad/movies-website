import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { searchForMulti } from '../../services/movies.api';
import Card from '../../components/Card';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import SkeletonLoader from '../../components/Skeleton';

function SearchResult() {

    const { query } = useParams();
    const [results, setResults] = useState([])
    const loader = useSelector((state) => state.loader.loader)

    const displaySearchResult = async () => {
        try {
            const res = await searchForMulti(query)
            console.log(res);

            setResults(res.data.results)
        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => {
        displaySearchResult()
    }, [query])

    return (
        <>
            {loader ? <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))}
                </div>
            </div> :
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                    {
                        results && results.map((result) => {
                            return (
                                <Card movie={result} key={result.id} />
                            )
                        })
                    }

                </div>
            }

        </>
    )
}

export default SearchResult
