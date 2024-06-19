import React, { useState } from 'react'
import GenreList from "../../constants/genre_list"
import i from "../../../assets/close-icon-30.png"

const AdvancedSearchModal = () => {
  const genres = GenreList[0].gerne.split(', ');
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div style={{height: isOpen ? "auto" : "74px"}} className='bg-gray-200  p-2 pb-6 border-2 border-slate-200 shadow-md rounded-lg mt-2'>
      {/*  */}
      <div className='flex justify-center'>
      <button onClick={() =>setIsOpen(!isOpen)} className='px-4 py-2 hover:opacity-60 bg-blue-400 text-white font-bold rounded-lg text-center cursor-pointer'>
        {isOpen ? <div>Hide search box</div> : <div>Show the search box</div>}
      </button>
      </div>

      <div style={{visibility: isOpen ? "visible" : "hidden"}}>
 {/* checkmark */}
 <div className='group flex items-center space-x-2'>
       <input type="checkbox" className='form-checkbox text-green-500 cursor-pointer' checked disabled/>
        <p className=''>Search in these categories</p>
       </div>

      {/* X Exclude */}
       {/* <div style={{visibility: isOpen ? "visible" : "hidden"}}  className='group flex items-center space-x-2'>
       <input type="checkbox" className='custom-checkbox cursor-pointer' checked disabled/>
        <p className=''>Exclude these categories</p>
       </div> */}

       <div className='group flex items-center space-x-2'>
       <input type="checkbox" className='cursor-pointer' defaultChecked={false} disabled/>
        <p className=''>Comics may or may not belong to this genre</p>
        </div>

        <div className='flex justify-center mt-2'>
          <button className='px-4 py-2 bg-blue-600 text-white font-bold text-center rounded-lg hover:opacity-60 cursor-pointer'>Reset</button>
        </div>
        {/* Checkbox item in genres */}
        <div className='mt-5'>
          <h2 className='font-semibold text-lg'>Comics genre</h2>
          <div className='mt-2'>
            <div className='grid grid-cols-3 gap-2'>
              {genres.map((genre:any, index: number) => (
                <div key={index} className='flex space-x-2 items-center'>
                  <input type="checkbox" className='form-checkbox text-green-500 cursor-pointer rounded w-5 h-5' 
                  />
                  <div>{genre}</div>
                </div>
              ))}
            </div>
            <div className='mt-5'>
              <div className='grid grid-cols-3 gap-5'>
                <div className='col-span-1'>
                <h2 className='text-lg font-semibold'>Chapters quantity</h2>
                <select form='searchSubmit' id='quantity' name='chapters' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-4 py-2'>
                <option value="{'>'} 0">{'>'} 0</option>
                <option value="{'>='} 50">{'>='} 50</option>
                <option value="{'>='} 100">{'>='} 100</option>
                <option value="{'>='} 200">{'>='} 200</option>
                <option value="{'>='} 300">{'>='} 300</option>
                <option value="{'>='} 400">{'>='} 400</option>
                <option value="{'>='} 500">{'>='} 500</option>
              </select> 
                </div>

                <div className='col-span-1'>
                <h2 className='text-lg font-semibold'>State</h2>
                <select form='searchSubmit' id='state' name='statelist' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-4 py-2'>
                <option value="all">All</option>
                <option value="Đang Cập Nhật">Updating</option>
                <option value="Hoàn Thành">Complete</option>
              </select> 
                </div>

                <div className='col-span-1'>
                <h2 className='text-lg font-semibold'>Sort by</h2>
                <select form='searchSubmit' id='sort' name='sort_by_date_orview' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full px-4 py-2'>
                <option value="CreateDateChapter">Posting date gradually decreases</option>
                <option value="CreateDateChapter">Posting date gradually increases</option>
                <option value="LastModifyDateChapter">Update date gradually decreases</option>
                <option value="LastModifyDateChapter">Update date gradually increases</option>
                <option value="views">Views gradually decrease</option>
                <option value="views">Views gradually increase</option>
              </select> 
                </div>

              </div>
            </div>
              <form action="" id='searchSubmit' className='mt-5'>
              <div className='flex justify-center mt-2'>
          <button className='px-4 py-2 bg-green-500 text-white font-bold text-center rounded-lg hover:opacity-60 cursor-pointer'>Search</button>
        </div>
              </form>

          </div>
          </div>
      </div>
     
       

    </div>
  )
}

export default AdvancedSearchModal