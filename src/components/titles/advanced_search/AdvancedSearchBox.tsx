import React, { useState } from "react";
import GenreList from "../../constants/genre_list";
import i from "../../../assets/close-icon-30.png";
import useComicList from "../../../hooks/CrudComicList";
import useOptions from "../../constants/option_advanced_search";
import { Comic } from "../../constants/types";

interface AdvancedSearchProps {
  setIsFindComic: (isFind: boolean) => void;
  setComicQuerys: (comics: Comic[]) => void; // Change the type here
}

const AdvancedSearchModal = (props: AdvancedSearchProps) => {
  const genres = GenreList[0].gerne.split(", ");
  const genresList = GenreList[0].gerne;
  console.log(genresList);
  
  const {
    selectedGenres,
    handleChecked,
    selectedOptionState,
    setSelectedOptionState,
    selectedOptionNum,
    setSelectedOptionNum,
    selectedOptionSort,
    setSelectedOptionSort,
    fetchSearchAdvanced,
    comicsQuery,
  } = useComicList();
  const [isOpen, setIsOpen] = React.useState(true);
  const { optionState, optionNumChapter, optionSortBy } = useOptions();

  const handeSearchAdvanced = async () => {
    props.setIsFindComic(true);
    setIsOpen(!isOpen);
    const genres = selectedGenres.join(", ");
    const stateCheckBox = selectedOptionState;
    const numOption = selectedOptionNum;
    const sortByOption = selectedOptionSort;
    const result = await fetchSearchAdvanced(
      stateCheckBox,
      numOption,
      sortByOption,
      genres
    );
    props.setComicQuerys(result);
    // window.location.reload();
  };

  return (
    <div
      style={{ height: isOpen ? "auto" : "74px" }}
      className="bg-gray-200  p-2 pb-6 border-2 border-slate-200 shadow-md rounded-lg mt-2"
    >
      {/*  */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-1 sm:py-2 hover:opacity-60 bg-blue-400 text-white font-bold rounded-lg text-center cursor-pointer"
        >
          {isOpen ? <div>Hide search box</div> : <div>Show the search box</div>}
        </button>
      </div>

      <div style={{ visibility: isOpen ? "visible" : "hidden" }}>
        {/* checkmark */}
        <div className="group flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox text-green-500 cursor-pointer"
            checked
            disabled
          />
          <p className="">Search in these categories</p>
        </div>

        {/* X Exclude */}
        {/* <div style={{visibility: isOpen ? "visible" : "hidden"}}  className='group flex items-center space-x-2'>
       <input type="checkbox" className='custom-checkbox cursor-pointer' checked disabled/>
        <p className=''>Exclude these categories</p>
       </div> */}

        <div className="group flex items-center space-x-2">
          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={false}
            disabled
          />
          <p className="">Comics may or may not belong to this genre</p>
        </div>

        <div className="flex justify-center mt-2">
          <button onClick={() => window.location.reload()} className="px-4 py-1 sm:py-2 bg-blue-600 text-white font-bold text-center rounded-lg hover:opacity-60 cursor-pointer">
            Reset
          </button>
        </div>
        {/* Checkbox item in genres */}
        <div className="mt-5">
          <h2 className="font-semibold text-lg">Comics genre</h2>
          <div className="mt-2">
            <div className="grid grid-cols-3 gap-2">
              {genres.map((genre: any, index: number) => (
                <div key={index} className="flex space-x-2 items-center">
                  <input
                    type="checkbox"
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={handleChecked}
                    className="form-checkbox text-green-500 cursor-pointer rounded w-5 h-5"
                  />
                  <div>{genre}</div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                <div className="col-span-1">
                  <h2 className="text-lg font-semibold">Chapters quantity</h2>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-4 py-2"
                    value={selectedOptionNum}
                    onChange={(e) => setSelectedOptionNum(e.target.value)}
                  >
                    {optionNumChapter.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <h2 className="text-lg font-semibold">State</h2>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-4 py-2"
                    value={selectedOptionState}
                    onChange={(e) => setSelectedOptionState(e.target.value)}
                  >
                    {optionState.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <h2 className="text-lg font-semibold">Sort by</h2>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full px-4 py-2"
                    value={selectedOptionSort}
                    onChange={(e) => setSelectedOptionSort(e.target.value)}
                  >
                    {optionSortBy.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <button
                onClick={handeSearchAdvanced}
                className="px-4 py-2 bg-green-500 text-white font-bold text-center 
            rounded-lg hover:opacity-60 cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;
