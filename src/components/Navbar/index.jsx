import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router'
import { TbWorld } from "react-icons/tb";
import { HiMenu, HiX } from "react-icons/hi";
import { changeAuth } from '../../store/slices/auth';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isLoggedin = useSelector((state) => state.auth.isLoggedin)
    const favorite = useSelector((state) => state.favorite.favorite)
    const { t, i18n } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)

    const changeLanguage = () => {
        const lang = localStorage.getItem('lang') == 'en' ? 'ar' : 'en'
        i18n.changeLanguage(lang)
        localStorage.setItem('lang', lang)
    }

    const handleSearch = (query) => {
        if (query.trim() !== '') navigate(`/searchResult/${query}`)
    }

    const logout = () => {
        dispatch(changeAuth(false))
        navigate('/login')
    }

    return (
        <nav className='px-3 text-white border-b border-gray-800'>
            <div className='p-4 flex justify-between items-center max-w-7xl mx-auto'>

                {/* Logo */}
                <div className='text-2xl font-semibold text-cyan-300'>
                    {t('movies')}
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-5 text-sm'>
                    <Link to="/">{t('home')}</Link>
                    <Link to="/movies">{t('movies')}</Link>
                    <Link to="/tv-shows">{t('tvShows')}</Link>

                    {isLoggedin ? (
                        <>
                            <Link to="/favorites">
                                {t('favorites')}
                                <span className='bg-cyan-400 rounded-full px-2 text-bold text-slate-900 ml-1'>
                                    {favorite.length}
                                </span>
                            </Link>
                            <Link to="/trendingToday">{t('trendingToday')}</Link>
                            <button onClick={logout} className='text-red-400 hover:cursor-pointer'>
                                {t('Logout')}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">{t('login')}</Link>
                            <Link to="/register">{t('register')}</Link>
                        </>
                    )}
                </div>

                {/* Right Section */}
                <div className='hidden md:flex items-center gap-4 '>
                    <button
                        onClick={changeLanguage}
                        className='flex bg-cyan-400 text-slate-900 rounded-full px-3 py-1 items-center gap-2'
                    >
                        <TbWorld />
                        {i18n.language == 'ar' ? t('english') : t('arabic')}
                    </button>

                    {isLoggedin ? (
                    <input
                        type="search"
                        placeholder={`${t('searchPlaceholder')}...`}
                        className='w-full p-1 rounded-lg bg-slate-700 text-gray-200'
                        onInput={(e) => handleSearch(e.target.value)}
                    />
                    ):null}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden text-2xl'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className='md:hidden flex flex-col gap-4 px-4 pb-4 bg-slate-900'>
                    <Link to="/">{t('home')}</Link>
                    <Link to="/movies">{t('movies')}</Link>
                    <Link to="/tv-shows">{t('tvShows')}</Link>

                    {isLoggedin ? (
                        <>
                            <Link to="/favorites">
                                {t('favorites')} ({favorite.length})
                            </Link>
                            <Link to="/trendingToday">{t('trendingToday')}</Link>
                            <button onClick={logout} className='text-red-400'>
                                {t('Logout')}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">{t('login')}</Link>
                            <Link to="/register">{t('register')}</Link>
                        </>
                    )}

                    <button
                        onClick={changeLanguage}
                        className='flex bg-cyan-400 text-slate-900 rounded-full px-3 py-1 items-center gap-2 w-fit'
                    >
                        <TbWorld />
                        {i18n.language == 'ar' ? t('english') : t('arabic')}
                    </button>

                    <input
                        type="search"
                        placeholder={`${t('searchPlaceholder')}...`}
                        className='w-full p-2 rounded-lg bg-slate-700 text-gray-200'
                        onInput={(e) => handleSearch(e.target.value)}
                    />
                </div>
            )}
        </nav>
    )
}

export default Navbar