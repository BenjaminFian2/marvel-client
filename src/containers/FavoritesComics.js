import "./FavoritesComics.css";

import Card from "../components/Card";
import Loader from "../components/Loader";

import axios from "axios";

import { Redirect } from "react-router-dom";

import { useState, useEffect } from "react";

const FavoritesComics = ({ tokenId, setSearch }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://benalgo-marvel-server.herokuapp.com/favorites`,
          {
            headers: { authorization: `Bearer ${tokenId}` },
          }
        );
        if (response.data) {
          setData(response.data.comics);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [tokenId, setData]);

  return !tokenId ? (
    <Redirect to="/" />
  ) : isLoading ? (
    <Loader />
  ) : (
    <div className="FavoritesComics">
      <div className="FavoritesComics-containers">
        {data &&
          data.map((item, index) => {
            return (
              <Card
                key={item._id}
                item={item}
                tokenId={tokenId}
                setData={setData}
                setSearch={setSearch}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FavoritesComics;
