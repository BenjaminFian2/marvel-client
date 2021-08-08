import "./CharacterComics.css";

import Card from "../components/Card";
import Loader from "../components/Loader";

import axios from "axios";

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

const CharacterComics = ({ tokenId, modals, setModals }) => {
  let param = useParams();

  const [data, setData] = useState();
  const [favorite, setFavorite] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://benalgo-marvel-server.herokuapp.com/comics/${param.id}`
        );
        if (tokenId) {
          const favorites = await axios.get(
            "https://benalgo-marvel-server.herokuapp.com/favorites",
            {
              headers: { authorization: `Bearer ${tokenId}` },
            }
          );
          if (favorites.data) {
            setFavorite(favorites.data.comics);
          }
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [tokenId, setFavorite, param.id]);

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
    <div className="CharacterComics">
      <div className="CharacterComics-img-container">
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt="character"
        />
      </div>

      <div className="CharacterComics-containers">
        {data.comics.map((item, index) => {
          return (
            <Card
              key={item._id}
              item={item}
              tokenId={tokenId}
              isFavorite={isFavorite(item)}
              setFavorite={setFavorite}
              modals={modals}
              setModals={setModals}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CharacterComics;
