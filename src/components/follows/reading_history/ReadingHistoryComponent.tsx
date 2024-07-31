import React from 'react'
import { useStateContext } from '../../../context/StateContext';
import { useNavigate } from 'react-router-dom';
import ReadingHistoryList from './ReadingHistoryList';
import SidebarIcon from '../../icon/SidebarIcon';
import { GrLinkPrevious } from 'react-icons/gr';

const ReadingHistoryComponent = () => {
  const navigate = useNavigate();
  const {setSelected} = useStateContext();

  return (
  <>
      <div className="pb-8 grid grid-cols-1 justify-center">
        <div className="flex space-x-2 items-center">
          <div
            className='p-3 rounded-full hover:bg-gray-200 cursor-pointer'
            onClick={() => {
              setSelected("home")
              navigate("/")
            }}
          >
            <SidebarIcon icon={<GrLinkPrevious size="18" />} />
          </div>

          <h1 className="text-2xl font-semibold">Reading History</h1>
        </div>
      </div>
        <ReadingHistoryList/>
    </>
  )
}

export default ReadingHistoryComponent