import "./Characters.css";

import Pagination from "../components/Pagination";
import Card from "../components/Card";
import Loader from "../components/Loader";

import axios from "axios";

import { useState, useEffect } from "react";

const Characters = ({ tokenId, search, modals, setModals, setSearch }) => {
  const [data, setData] = useState();
  const [favorite, setFavorite] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [numItems, setNumItems] = useState(100);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://benalgo-marvel-server.herokuapp.com/characters?name=${search}&limit=${numItems}&skip=${
            (page - 1) * numItems
          }`
        );
        if (tokenId) {
          const favorites = await axios.get(
            "https://benalgo-marvel-server.herokuapp.com/favorites",
            {
              headers: { authorization: `Bearer ${tokenId}` },
            }
          );
          if (favorites.data) {
            setFavorite(favorites.data.characters);
          }
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [tokenId, search, numItems, page, setPage, setFavorite]);

  const selectEntries = () => {
    const tab = [];
    for (let i = 1; i <= 100; i++) {
      tab.push(i);
    }
    return tab;
  };

  let numPages;

  if (!isLoading) {
    numPages = Math.ceil(data.count / numItems);
  }

  const isFavorite = (item) => {
    if (favorite) {
      for (let i = 0; i < favorite.length; i++) {
        if (favorite[i]._id === item._id) {
          return true;
        }
      }
    }
    return false;
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="Characters">
      <Pagination
        numItems={numItems}
        setNumItems={setNumItems}
        numPages={numPages}
        selectEntries={selectEntries}
        page={page}
        setPage={setPage}
      />
      <div className="Characters-containers">
        {data.results.map((item, index) => {
          return (
            <Card
              key={item._id}
              item={item}
              tokenId={tokenId}
              isFavorite={isFavorite(item)}
              setFavorite={setFavorite}
              modals={modals}
              setModals={setModals}
              setSearch={setSearch}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
