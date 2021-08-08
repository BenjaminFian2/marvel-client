import "./Pagination.css";

const Pagination = ({
  selectEntries,
  numPages,
  numItems,
  setNumItems,
  page,
  setPage,
}) => {
  return (
    <div className="Pagination">
      <div className="Pagination-select-page">
        <p>items per page : </p>
        <select
          value={numItems}
          onChange={(event) => {
            setNumItems(event.target.value);
            setPage(1);
          }}
        >
          {selectEntries().map((value, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      <div className="Pagination-pages">
        <button
          className="Pagination-previous-button"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Précédent
        </button>
        {/* {[...Array(numPages)].map((elem, index) => {
          return (
            <button
              key={index}
              value={index + 1}
              onClick={(event) => {
                setPage(Number(event.target.value));
              }}
              className={
                page === Number(index + 1)
                  ? "Pagination-btn-active-page"
                  : "Pagination-btn-page"
              }
            >
              {index + 1}
            </button>
          );
        })} */}
        <button
          className="Pagination-next-button"
          onClick={() => {
            if (page < numPages) {
              setPage(page + 1);
            }
          }}
        >
          suivant
        </button>
      </div>
    </div>
  );
};

export default Pagination;
