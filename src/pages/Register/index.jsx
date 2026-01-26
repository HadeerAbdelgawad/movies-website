import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";


function Register() {

    const [showPass, setSHowPass] = useState(false)
    const [showConfirmPass, setSHowConfirmPass] = useState(false)
    const { watch, handleSubmit, register, formState: { errors } } = useForm()
    const password = watch("password")

    const onSubmit = (data) => {
        console.log(data);

    }


    return (
        <>
            <div className=' flex flex-col justify-center max-w-3/5 text-center m-auto'>
                <div className='bg-gray-700 bg-opacity-25 flex flex-col justify-center items-center gap-4 py-10 rounded-xl shadow shadow-gray-400 '>
                    <h1 className='text-2xl font-bold text-gray-300'>Register Form</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col justify-center items-center w-full gap-4 px-5'>
                        <input type="text" placeholder='Enter Your Name' name='name'
                            {...register('name',
                                {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9]{3,}$/,
                                        message: "UserName length should be greater than 3"
                                    },
                                }
                            )}
                            className='text-gray-200 w-full border border-gray-600 shadow shadow-gray-600 rounded-2xl px-3 py-2 focus:outline-none' />
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
                            className='text-gray-200 w-full border border-gray-600 shadow shadow-gray-600 rounded-2xl px-3 py-2 focus:outline-none' />
                        {(errors.email?.type == 'required') ? <small className='text-red-200'>{errors.email?.message}</small> :
                            (errors.email?.type == 'pattern') ? <small className='text-red-200'>{errors.email?.message}</small> : null}

                        <input type="text" placeholder='Enter Your UserName' name='userName'
                            {...register('userName',
                                {
                                    required: {
                                        value: true,
                                        message: 'UserName is Required'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9 ]{6,}$/,
                                        message: "Username must be at least 6 characters"
                                    }
                                }
                            )}
                            className='text-gray-200 w-full border border-gray-600 shadow shadow-gray-600 rounded-2xl px-3 py-2 focus:outline-none' />
                        {(errors.userName?.type == 'required') ? <small className='text-red-200'>{errors.userName?.message}</small> :
                            (errors.userName?.type == 'pattern') ? <small className='text-red-200'>{errors.userName?.message}</small> : null}

                        <div className='relative w-full'>
                            <input type={showPass ? 'text' : 'password'}  placeholder='Enter Your Password' name='password'
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
                                className='text-gray-200 w-full border border-gray-600 shadow shadow-gray-600 rounded-2xl px-3 py-2 focus:outline-none' />
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
                                className=' text-gray-200 w-full border border-gray-600 shadow shadow-gray-600 rounded-2xl px-3 py-2 focus:outline-none' />
                            <div className='absolute right-7 top-3 text-lg text-white' onClick={() => { setSHowConfirmPass(!showConfirmPass) }}>{showConfirmPass ? <FaEye /> : <FaEyeSlash />}</div>
                        </div>

                        {(errors.confirmPass?.type == 'required') ? <small className='text-red-200'>{errors.confirmPass?.message}</small> :
                            (errors.confirmPass) ? <small className='text-red-200'>{errors.confirmPass?.message}</small> : null}

                        <button type="submit"
                            // disabled={(errors.emailError || errors.passwordError || user.email == '' || user.password == '')}
                            className='text-gray-300 text-lg rounded-2xl px-4 py-2 bg-gradient-to-r from-gray-800 to-cyan-950-800 shadow shadow-gray-300 hover:cursor-pointer hover:bg-gradient-to-r hover:from-cyan-950 hover:to-gray-800'>Register</button>
                        <small className='text-gray-200'>Already Have An Account? <NavLink to={'/login'} className='text-blue-400 underline'>Login</NavLink></small>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Register
