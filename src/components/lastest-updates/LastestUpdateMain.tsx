import React from 'react'
import LastestUpdateContent from './LastestUpdateContent'

const LastestUpdateMain = () => {
  return (
    <div className='h-auto'>
      <div className='container pb-8'>
        <h1 className='text-2xl font-semibold mb-4 mt-8'>Lastest Updates</h1>
       <LastestUpdateContent/>
      </div>
    </div>
  )
}

export default LastestUpdateMain