import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';


function Register() {
    const loader = useSelector((state) => state.loader.loader)
    const [showPass, setSHowPass] = useState(false)
    const [showConfirmPass, setSHowConfirmPass] = useState(false)
    const { watch, handleSubmit, register, formState: { errors } } = useForm()

    const password = watch("password")
    const navigate = useNavigate()

    const onSubmit = (data) => {
        try {
            console.log(data);

            const users = JSON.parse(localStorage.getItem('Registered Data'))
            if (users && data.email == users.email) {
                toast.error('Email already exist')
                return;
            }
            localStorage.setItem('Registered Data', JSON.stringify(data))
            toast.success('Registered Successfully')
            console.log(data);
            navigate('/login')
        } catch (e) {
            console.log(e);

        }
    }


    return (
        <>
            {loader ? <div className='flex justify-center items-center min-h-100'><Loader /></div> :

                <div className='min-h-screen flex items-center justify-center bg-linear-to-b from-slate-900 to-slate-800 py-12'>
                    <div className='w-full max-w-md px-6'>
                        <div className='bg-slate-800/50 border border-gray-700/40 flex flex-col justify-center items-center gap-4 py-8 rounded-xl shadow-2xl backdrop-blur-sm'>
                            <h1 className='text-2xl font-bold text-gray-100'>Register Form</h1>

                            <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col justify-center items-center w-full gap-4 px-5'>
                                <input type="text" placeholder='Enter Your Name' name='name'
                                    {...register('name',
                                        {
                                            required: {
                                                value: true,
                                                message: 'Name is Required'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z ]{3,}$/,
                                                message: "UserName length should be greater than 3"
                                            },
                                        }
                                    )}
                                    className='text-gray-100 w-full border border-gray-700/30 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500' />
                                {(errors.name?.type == 'required') ? <small className='text-red-200'>{errors.name?.message}</small> :
                                    (errors.name?.type == 'pattern') ? <small className='text-red-200'>{errors.name?.message}</small> : null}

                                <input type="email" placeholder='Enter Your Email' name='email'
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
                                    className='text-gray-100 w-full border border-gray-700/30 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500' />
                                {(errors.email?.type == 'required') ? <small className='text-red-200'>{errors.email?.message}</small> :
                                    (errors.email?.type == 'pattern') ? <small className='text-red-200'>{errors.email?.message}</small> : null}

                                <div className='relative w-full'>
                                    <input type={showPass ? 'text' : 'password'} placeholder='Enter Your Password' name='password'
                                        {...register('password',
                                            {
                                                required: {
                                                    value: true,
                                                    message: 'Password is Required'
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._+-])[A-Za-z\d@$!%*?&._+-]{6,}$/,
                                                    message: "Weak password"
                                                }
                                            }
                                        )}
                                        className='text-gray-100 w-full border border-gray-700/30 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500' />
                                    <div className='absolute right-7 top-3 text-lg text-white' onClick={() => { setSHowPass(!showPass) }}>{showPass ? <FaEye /> : <FaEyeSlash />}</div>
                                </div>

                                {(errors.password?.type == 'required') ? <small className='text-red-200'>{errors.password?.message}</small> :
                                    (errors.password?.type == 'pattern') ? <small className='text-red-200'>{errors.password?.message}</small> : null}

                                <div className='relative w-full'>
                                    <input type={showConfirmPass ? 'text' : 'password'} placeholder='Confirm Password' name='confirmPass'
                                        {...register('confirmPass',
                                            {
                                                required: {
                                                    value: true,
                                                    message: 'Confirm Password is Required'
                                                },
                                                validate: value => value === password || "Passwords do not match"
                                            }
                                        )}
                                        className=' text-gray-100 w-full border border-gray-700/30 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500' />
                                    <div className='absolute right-7 top-3 text-lg text-white' onClick={() => { setSHowConfirmPass(!showConfirmPass) }}>{showConfirmPass ? <FaEye /> : <FaEyeSlash />}</div>
                                </div>

                                {(errors.confirmPass?.type == 'required') ? <small className='text-red-200'>{errors.confirmPass?.message}</small> :
                                    (errors.confirmPass) ? <small className='text-red-200'>{errors.confirmPass?.message}</small> : null}

                                <button type="submit"
                                    // disabled={(errors.emailError || errors.passwordError || user.email == '' || user.password == '')}
                                    className='text-white text-lg rounded-2xl px-4 py-2 bg-linear-to-r from-cyan-500 to-cyan-600 shadow-lg hover:opacity-95 transition'>Register</button>
                                <small className='text-gray-200'>Already Have An Account? <NavLink to={'/login'} className='text-cyan-300 underline'>Login</NavLink></small>
                            </form>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Register
