import React from 'react'

function FormField({type , placeholder ,value ,name, ...props }) {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                {...props}
                className="text-gray-100 w-full border border-gray-700/30 bg-transparent rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
        </>
    )
}

export default FormField
