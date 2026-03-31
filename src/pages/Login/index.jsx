import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'
import FormField from '../../components/FormField'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useFetch } from '../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuth } from '../../store/slices/auth';
import Loader from '../../components/Loader';

function Login() {

    const loader = useSelector((state) => state.loader.loader)
    const isLoggedin = useSelector((state) => state.auth.isLoggedin)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPass, setSHowPass] = useState(false)
    const { handleSubmit, register, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const storedUsers = JSON.parse(localStorage.getItem('Registered Data'))
            if (!storedUsers || storedUsers.email !== data.email) {
                toast.error("Email doesn't exist")
                return
            }

            if (storedUsers.password !== data.password) {
                toast.error('Password wrong')
                return
            }
            dispatch(changeAuth(true))
            localStorage.setItem('isLoggedin', true)
            navigate('/')
        } catch (e) {
            console.log(e);
            toast.error('Error Loggining in,Try Again')

        }
    }


    return (
        <>
            {loader ? <div className='flex justify-center items-center min-h-100'><Loader /></div> :
                <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-900 to-slate-800 py-12">
                    <div className="w-full max-w-md px-6">
                        <div className="bg-slate-800/50 border border-gray-700/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
                            <div className="flex items-center justify-center mb-6">
                                <h1 className="text-3xl font-extrabold text-gray-100">Welcome back</h1>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <label className="text-sm text-gray-300 ml-2">Email</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {/* mail icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0l-4-4m4 4l-4 4M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6" />
                                        </svg>
                                    </span>
                                    <FormField type='email' placeholder="you@domain.com" name='email'
                                        {...register('email',
                                            {
                                                required: {
                                                    value: true,
                                                    message: 'Email is Required'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@(gmail|outlook)\.com$/,
                                                    message: "Email doesn't follow email pattern should include @"
                                                }
                                            }
                                        )}
                                    />

                                </div>
                                {(errors.email?.type == 'required') ? <small className='block text-red-300 ml-1 mt-1'>{errors.email?.message}</small> :
                                    (errors.email?.type == 'pattern') ? <small className='block text-red-300 ml-1 mt-1'>{errors.email?.message}</small> : ''}

                                <label className="text-sm text-gray-300 ml-2">Password</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {/* lock icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 00-6 0v2c0 1.657 1.343 3 3 3z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
                                        </svg>
                                    </span>

                                    <FormField type={showPass ? 'text' : 'password'} placeholder="Enter your Password" name='password'
                                        {...register('password',
                                            {
                                                required: {
                                                    value: true,
                                                    message: 'Password is Required'
                                                },

                                            }
                                        )}
                                    />
                                    <div className='absolute right-7 top-3 text-lg text-white' onClick={() => { setSHowPass(!showPass) }}>{showPass ? <FaEye /> : <FaEyeSlash />}</div>

                                </div>
                                {(errors.password?.type == 'required') ? <small className='block text-red-300 ml-1 mt-1'>{errors.email?.message}</small> : ''}

                                <button
                                    type="submit"
                                    disabled={(errors.email || errors.password)}
                                    className={`w-full mt-2 text-white text-lg rounded-full px-4 py-3 bg-linear-to-r from-cyan-500 to-cyan-600 shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    Login
                                </button>

                                <div className="text-center mt-3">
                                    <small className='text-gray-300'>Don't have an account? <NavLink to={'/register'} className='text-cyan-300 underline'>Register</NavLink></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}

        </>
    )
}

export default Login
