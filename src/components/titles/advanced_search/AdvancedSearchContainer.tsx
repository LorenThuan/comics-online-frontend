import React from "react";
import SidebarIcon from "../../icon/SidebarIcon";
import { GrLinkPrevious } from "react-icons/gr";
import AdvancedSearchModal from "./AdvancedSearchBox";
import ListComicSearch from "../../searchbar/ListComicSearch";
import useComicList from "../../hooks/CrudComicList";
import SearchListValue from "./SearchListValue";

const AdvancedSearchContainer = () => {
  const { comicList } = useComicList();

  return (
    <div className="mr-4">
      <div className="flex space-x-2 items-center">
        <SidebarIcon
          icon={<GrLinkPrevious size="18" />}
          className="p-3 hover:bg-gray-200 rounded-full cursor-pointer"
        />
        <h2 className="font-semibold text-2xl">Advanced Search</h2>
      </div>

      <AdvancedSearchModal />
      <div className="mt-2 grid grid-cols-6">
        <SearchListValue />
        <SearchListValue></SearchListValue>
        <SearchListValue></SearchListValue>
        <SearchListValue></SearchListValue>
        <SearchListValue></SearchListValue>
        <SearchListValue></SearchListValue>
      </div>
    </div>
  );
};

export default AdvancedSearchContainer;
