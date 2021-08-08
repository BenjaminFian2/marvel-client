import "./Card.css";

import { useHistory } from "react-router-dom";

import axios from "axios";

const Card = ({
  tokenId,
  item,
  isFavorite,
  setFavorite,
  modals,
  setModals,
  setSearch,
  setData,
}) => {
  let history = useHistory();

  const handleAddFavorite = async () => {
    try {
      if (item.name) {
        const response = await axios.post(
          `https://benalgo-marvel-server.herokuapp.com/favorite/character/${item._id}`,
          {
            urlImg: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            name: item.name,
            description: item.description,
          },
          {
            headers: { authorization: `Bearer ${tokenId}` },
          }
        );
        setFavorite(response.data.characters);
      }
      if (item.title) {
        const response = await axios.post(
          `https://benalgo-marvel-server.herokuapp.com/favorite/comic/${item._id}`,
          {
            urlImg: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            title: item.title,
            description: item.description,
          },
          {
            headers: { authorization: `Bearer ${tokenId}` },
          }
        );
        setFavorite(response.data.comics);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      if (item.urlImg) {
        if (item.name) {
          const response = await axios.delete(
            `https://benalgo-marvel-server.herokuapp.com/favorite/characterDelete/${item._id}`,
            {
              headers: { authorization: `Bearer ${tokenId}` },
            }
          );
          setData(response.data.characters);
        }
        if (item.title) {
          const response = await axios.delete(
            `https://benalgo-marvel-server.herokuapp.com/favorite/comicDelete/${item._id}`,
            {
              headers: { authorization: `Bearer ${tokenId}` },
            }
          );
          setData(response.data.comics);
        }
      } else {
        if (item.name) {
          const response = await axios.delete(
            `https://benalgo-marvel-server.herokuapp.com/favorite/characterDelete/${item._id}`,
            {
              headers: { authorization: `Bearer ${tokenId}` },
            }
          );
          setFavorite(response.data.characters);
        }
        if (item.title) {
          const response = await axios.delete(
            `https://benalgo-marvel-server.herokuapp.com/favorite/comicDelete/${item._id}`,
            {
              headers: { authorization: `Bearer ${tokenId}` },
            }
          );
          setFavorite(response.data.comics);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Card">
      {item.name ? (
        <h2
          className="Card-title"
          onClick={() => {
            history.push(`/CharacterComics/${item._id}`);
            setSearch("");
          }}
        >
          {item.name}
        </h2>
      ) : (
        item.title && <h2 className="Card-title">{item.title}</h2>
      )}
      {item.urlImg ? (
        <img src={item.urlImg} alt="cover" />
      ) : (
        <img
          src={item.thumbnail.path + "." + item.thumbnail.extension}
          alt="cover"
        />
      )}

      <p className="Card-desc">
        {item.description} <br />
        <br />
        {!tokenId ? (
          <button
            className="Card-favorite add"
            onClick={() => {
              const tab = [...modals];
              tab[1] = true;
              setModals(tab);
            }}
          >
            add to favorite
          </button>
        ) : isFavorite || item.urlImg ? (
          <button
            className="Card-favorite remove"
            onClick={() => {
              handleRemoveFavorite();
            }}
          >
            remove to favorite
          </button>
        ) : (
          <button
            className="Card-favorite add"
            onClick={() => {
              handleAddFavorite();
            }}
          >
            add to favorite
          </button>
        )}
      </p>
    </div>
  );
};

export default Card;
