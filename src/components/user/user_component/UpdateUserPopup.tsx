import React from 'react'
import CrudUser from '../../hooks/CrudUser';
import { User } from '../../constants/types';

interface updateUserProps {
  isOpenUpdate: boolean;
  closeUpdatePopup(): void;
  userData: User;
  handleChangeUpdate(event: any): void; // Adjust this according to your needs
  handleFormUpdate(event: React.FormEvent<HTMLFormElement>): void;
  selectedValue: string;
}

const UpdateUserPopup = (props:updateUserProps) => {
  console.log(props.isOpenUpdate)
  console.log(props.userData)
  console.log(props.handleChangeUpdate);

  return (
    <>
  
    {props.isOpenUpdate && <div className='fixed h-screen w-screen right-0 top-0 backdrop-brightness-90'>
      <div className='fixed shadow-md rounded-md left-1/2 top-1/2 -translate-y-1/2 bg-white'>
      <form
        onSubmit={props.handleFormUpdate}
        className="flex justify-center items-center bg-blue-300 p-4 rounded shadow-sm">
        <div className="space-y-12 rounded-lg">
          <h2 className="text-base font-semibold text-center text-white">
            Update Form
          </h2>
          <div className="grid grid-col-1 gap-x-6 gap-y-8 sm:grid-col-3">
            <div className="sm:col-span-1">
              <label htmlFor="name" className="text-base font-semibold">
                Username
              </label>
              <div className="mt-4">
                <input
                  type="text"
                  required
                  value={props.userData?.name}
                  onChange={props.handleChangeUpdate}
                  placeholder="name"
                  name="name"
                  className="block py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="email" className="text-base font-semibold">
                Email
              </label>
              <div className="mt-4">
                <input
                  type="text"
                  required
                  value={props.userData.email}
                  onChange={props.handleChangeUpdate}
                  placeholder="email"
                  name="email"
                  className="block py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="password" className="text-base font-semibold">
                Password
              </label>
              <div className="mt-4">
                <input
                  type="text"
                  required
                  value={props.userData.password}
                  onChange={props.handleChangeUpdate}
                  name="password"
                  placeholder="password"
                  className="block py-1.5 pl-2 border-1 focus:ring-0 bg-gray-200 shadow-sm rounded-lg sm:leading-6 sm:text-md"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="role" className="text-base font-semibold">
                Role
              </label>
              <div className="mt-4">
               <select value={props.selectedValue} onChange={props.handleChangeUpdate} name="role" id="role" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-4 py-2'>
                <option value="ROLE_USER">ROLE_USER</option>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
               </select>
            </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-x-6">
              <button
                className="py-2 px-6 text-center bg-red-400 hover:bg-red-500 focus-visible:outline text-white font-semibold shadow-sm rounded-md"
              >
                Update User
              </button>
              <button
                      type="button"
                      onClick={props.closeUpdatePopup}
                      className="py-2 px-6 text-center bg-gray-400 hover:bg-gray-500 focus-visible:outline text-white font-semibold shadow-sm rounded-md"
                    >
                      Cancel
                    </button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>}
    </>
  )
}

export default UpdateUserPopup