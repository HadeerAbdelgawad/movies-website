import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getMovieVideos } from '../../services/movies.api'
import Loader from '../../components/Loader'
import { TbHandFingerLeft, TbHandFingerRight } from "react-icons/tb"
import { getTvShowVideos } from '../../services/tvShows.api'
import { useTranslation } from 'react-i18next'

function ShowVideos() {

    const [iframeLoading, setIframeLoading] = useState({})
    const [activeVideo, setActiveVideo] = useState(null)
    const { id, mediaType } = useParams()
    const [videos, setVideos] = useState([])
    const loader = useSelector((state) => state.loader.loader)
    const { t, i18n } = useTranslation()

    const getVideos = async () => {
        try {
            if (mediaType === 'movie') {
                const res = await getMovieVideos(id)
                setVideos(res.data.results)
                console.log(res.data.results)
            } else if (mediaType === 'tv') {
                const res = await getTvShowVideos(id)
                setVideos(res.data.results)
                console.log(res.data.results)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getVideos()
    }, [id])

    return (
        <>
            {loader ? (
                <div className="flex justify-center items-center min-h-[80vh]">
                    <Loader />
                </div>
            ) : (videos.length === 0) ? (
                <div className="flex justify-center items-center min-h-[80vh] text-gray-400 text-lg">
                    No Videos Available
                </div>
            ) : (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map(video => (
                        <div
                            key={video.id}
                            className="bg-slate-900/50 border border-gray-700 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            {/* Video Header */}
                            <button
                                className={`w-full flex items-center gap-2 text-left px-4 py-3 font-semibold text-lg hover:text-blue-400 hover:cursor-pointer rounded-t-xl focus:outline-none ${activeVideo === video.id ? "bg-gray-800" : ""}`}
                                onClick={() => {
                                    const isSame = video.id === activeVideo
                                    setActiveVideo(isSame ? null : video.id)
                                    if (!isSame) {
                                        setIframeLoading(prev => ({ ...prev, [video.id]: true }))
                                    }
                                }}
                            >
                                <span className="text-blue-500 text-2xl">{i18n.language == 'ar' ? <TbHandFingerLeft /> : <TbHandFingerRight />}</span>
                                {video.name}
                            </button>

                            {/* Video Meta */}
                            <div className="px-4 py-2 text-gray-400 text-sm">
                                {video.type} | Published: {new Date(video.published_at).toLocaleDateString()}
                            </div>

                            {/* Video Player - always rendered, animated with max-height */}
                            {video.site === "YouTube" && (
                                <div
                                    className={`relative overflow-hidden transition-all duration-500 ease-in-out px-4 pb-4`}
                                    style={{
                                        maxHeight: activeVideo === video.id ? "500px" : "0",
                                        opacity: activeVideo === video.id ? 1 : 0
                                    }}
                                >
                                  {activeVideo === video.id && (
                                     <>
                                      {iframeLoading[video.id] && (
                                        <div className="absolute p-2 inset-0 flex items-center justify-center bg-black/70 rounded-md z-10">
                                            <Loader />
                                        </div>
                                    )}
                                    <iframe
                                        className="w-full aspect-video rounded-md"
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title={video.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        onLoad={() => {
                                            setIframeLoading(prev => ({ ...prev, [video.id]: false }))
                                        }}
                                    />
                                    </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ShowVideos