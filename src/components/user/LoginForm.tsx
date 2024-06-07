import React from 'react'
import CrudUser from '../hooks/CrudUser';

const LoginForm = () => {

  const {setEmail, setPassword, error, handle} = CrudUser();

  return (
    <>
    {error && <p className='text-red-500 text-base font-medium text-center leading-6'>{error}</p>}
    <form onSubmit={handle} className='flex justify-center items-center h-screen bg-blue-300'>
      <div className='space-y-12 border-2 rounded-lg pb-12'>
        <h2 className='text-base font-semibold text-cente text-white'>Login Form</h2>
        <div className='grid grid-col-1 gap-x-6 gap-y-8 sm:grid-col-3'>
          <div className='sm:col-span-1'>
            <label htmlFor="email" className='text-base font-semibold'>Email</label>
            <div className='mt-4'>
              <input type="text" required onChange={(e) => setEmail(e.target.value)} placeholder='email' name='email' className='block py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md'/>
            </div>
          </div>

          <div className='sm:col-span-1'>
            <label htmlFor="password" className='text-base font-semibold'>Password</label>
            <div className='mt-4'>
              <input type="text" required onChange={(e) => setPassword(e.target.value)} name='password' placeholder='password' className='block py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md'/>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-center gap-x-6'>
            <button className='py-2 px-16 text-center bg-red-400 hover:bg-red-500 focus-visible:outline text-white font-semibold shadow-sm rounded-md'>Login</button>
          </div>
          

        </div>
      </div>
      
    </form>
    </>
  )
}

export default LoginForm