import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../context/StateContext';
import SidebarIcon from '../../icon/SidebarIcon';
import { GrLinkPrevious } from 'react-icons/gr';
import RecentlyAddAll from './RecentlyAddAll';
import useComicList from '../../../hooks/CrudComicList';

const RecentlyAddComponent = () => {
  const navigate = useNavigate();
  const {setSelected} = useStateContext();
  const {recentlyComic} = useComicList();
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

          <h1 className="text-2xl font-semibold">Recently Added</h1>
        </div>
      </div>
        <RecentlyAddAll data={recentlyComic}/>
    </>
  );
}

export default RecentlyAddComponent