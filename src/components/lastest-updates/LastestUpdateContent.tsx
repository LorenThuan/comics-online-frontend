import React, { useEffect, useState } from "react";
import LastestUpdateList from "./LastestUpdateList";
import useComicList from "../../hooks/CrudComicList";
import { useStateContext } from "../../context/StateContext";
import axios from "axios";
import { ComicFull } from "../constants/types";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const LastestUpdateContent = () => {
  const { comicListAll, loadingLastComics } = useComicList();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mr-4">
      <LastestUpdateList data={comicListAll.slice(0, 6)} loadingLastComics={loadingLastComics} />
      <LastestUpdateList data={comicListAll.slice(7, 13)} loadingLastComics={loadingLastComics} />
    </div>
  );
};

export default LastestUpdateContent;
