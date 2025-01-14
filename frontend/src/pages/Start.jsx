import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-[url("/home.jpg")] h-screen pt-8 w-screen flex justify-between flex-col bg-red-400'>
            <img className='w-16 ml-8' src="uber-logo.png" alt="logo" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
                <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-2'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start