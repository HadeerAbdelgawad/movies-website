import React, { useState } from 'react'
import { NavLink } from 'react-router'


function Login() {

    const [errors, setErrors]= useState({
        emailError:null,
        passwordError:null
    })
    const [user, setUser]= useState({
        email:'',
        password:''
    })

    const handleChange=(evt)=>{
        if(evt.target.name=='email'){
            setUser({...user, email:evt.target.value})
            setErrors({...errors, 
                emailError:(evt.target.value.length==0)?
                'Email is required':(!evt.target.value.includes('@'))?
                'Email should follow Email Pattern "user@RiMvAiLine.com"':null})
        }else if(evt.target.name=='password'){
            setUser({...user, password:evt.target.value})
             setErrors({...errors, 
                passwordError:(evt.target.value.length==0)?
                'Password is required':(evt.target.value.length<6)?
                'Password should length should be large than 6 characters':null})
        }

    }

    const handleSubmit=(evt)=>{
        evt.preventDefault()
        console.log(evt);
    }
    return (
        <>
            <div className=' h-screen flex flex-col justify-center max-w-3/5 text-center m-auto'>
                <div className='bg-gray-700 bg-opacity-25 flex flex-col justify-center items-center gap-4 py-10 rounded-xl shadow shadow-gray-400 '>
                    <h1 className='text-2xl font-bold text-gray-300'>Login</h1>

                    <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col justify-center items-center w-full gap-4 px-5'>
                        <input type="email" placeholder='Enter Your Email' value={user.email} name='email'
                            onChange={(e)=>handleChange(e)}
                            className='text-gray-200 w-full border border-gray-600 shadow shadow-gray-600 rounded-2xl px-3 py-2 focus:outline-none' />
                        {errors.emailError&&<small className='text-red-200'>{errors.emailError}</small>}

                        <input type="password" placeholder='Enter Your Password' value={user.password} name='password'
                            onChange={(e)=>handleChange(e)}
                            className='text-gray-200 w-full border border-gray-600 shadow shadow-gray-600 rounded-2xl px-3 py-2 focus:outline-none' />
                        {errors.passwordError&&<small className='text-red-200'>{errors.passwordError}</small>}

                        <button type="submit"
                        disabled={(errors.emailError|| errors.passwordError||user.email==''||user.password=='')}
                            className='text-gray-300 text-lg rounded-2xl px-4 py-2 bg-gradient-to-r
                        from-gray-800 to-cyan-950-800 shadow shadow-gray-300 hover:cursor-pointer 
                        hover:bg-gradient-to-r hover:from-cyan-950 hover:to-gray-800'>Login</button>
                        <small className='text-gray-200'>Don't Have Account? <NavLink to={'/register'} className='text-blue-400 underline'>Register</NavLink></small>

                    </form>
                </div>

            </div>

        </>
    )
}

export default Login
