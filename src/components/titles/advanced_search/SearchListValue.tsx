import React from 'react'
import DemoImg from "../../../assets/SaladBowl.jpg"
import VnLogo from "../../../assets/vn.svg"
import { Comic } from '../../constants/types'

interface SearchListValueProps {
  data: Comic[];
}

const SearchListValue = ({data}: SearchListValueProps) => {
  return (
    <div className='mt-2 grid grid-cols-6'>
    {data?.map((comicItem:Comic, index: number) => (
      <div key={index} className="m-2">
      <div className='flex justify-center'>
      <img src={comicItem.image_src} alt="Demo" className='w-[180px] h-[233px] object-cover rounded-lg shadow-sm'/>
      </div>
      <div className='mt-2'>
      <div className='flex items-center flex-col'>
        <div className='flex space-x-1'>
        <img src={VnLogo} alt="vn" className='w-[24px] h-[24px] object-cover'/>
        <div className='text-base text-blue-800 font-bold'>{comicItem.nameComic}</div>
        </div>
        <ul className=''>
                <li className='text-blue-800'>{comicItem.chapterList?.[0]?.toString()}</li>
        </ul> 
     
      </div>
      </div>

    </div>
    ))}
    </div>
  )
}

export default SearchListValue