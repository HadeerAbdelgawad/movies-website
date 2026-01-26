import React from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router'
import { TbWorld } from "react-icons/tb";


function Navbar() {
    const navigate= useNavigate();
    const favorite= useSelector((state)=>state.favorite.favorite)
    console.log(favorite);
    const {t , i18n} = useTranslation()
    
    
    const changeLanguage=()=>{
        const lang= localStorage.getItem('lang')=='en'?'ar':'en'
        i18n.changeLanguage(lang)
        localStorage.setItem('lang', lang)
    }

    const handleSearch= (query)=>{
        if(query.trim()!=='') navigate(`/searchResult/${query}`)
    }

    return (
    <>
    <nav className='text-white m-0'>
        <div className='p-4 flex flex-col md:flex-row justify-between items-center'>
            <div className='text-3xl font-semibold'>{t('movies')}</div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
                <Link to="/" className='px-4'>{t('home')}</Link>
                <Link to="/movies" className='px-4'>{t('movies')}</Link>
                <Link to="/tv-shows" className='px-4'>{t('tvShows')}</Link>
                <Link to="/favorites" className='px-4'>{t('favorites')}<span className='bg-gray-500 rounded-full px-2 text-gray-900 '>{favorite.length}</span></Link>
            </div>
            <div className='flex gap-4  items-center w-full md:w-xs mx-4'>

                <button className='flex hover:cursor-pointer hover:shadow hover:shadow-gray-300 bg-gradient-to-r from-cyan-200 to-blue-500 text-gray-900 rounded-2xl px-2 py-1' 
                    onClick={()=>{changeLanguage()}}><TbWorld className='text-2xl text-blue-700'/>
                    {i18n.language=='ar'?t('english'):t('arabic')}
                </button>

                <input type="search" placeholder={`${t('searchPlaceholder')}...`} className='w-full p-2 rounded-lg bg-gray-700'
                onInput={(e)=>handleSearch(e.target.value)}/>
            </div>
        </div>
        
    </nav>
    </>
    
    )
}

export default Navbar
