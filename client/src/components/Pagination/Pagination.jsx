import { useState } from "react";
import style from "./Pagination.module.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Pagination({ nPerPage, index, setIndex }) {
  const recipes = useSelector((state) => state.recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const [cantPage, setCantPage] = useState(
    Math.ceil(recipes.length / nPerPage)
  );

  const pageNumber = [];
  let lastPage;
  let firtPage;

  for (let i = 1; i <= cantPage; i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    setCantPage(Math.ceil(recipes.length / nPerPage));
    currentPage > pageNumber.length ? setPage(1) : setPage(currentPage);
  }, [nPerPage, currentPage, cantPage, recipes]);

  function setPage(pagina) {
    setCurrentPage(pagina);
    lastPage = currentPage * nPerPage;
    firtPage = lastPage - nPerPage;
    if (recipes.length < lastPage) lastPage = recipes.length;
    setIndex({ ...index, firt: firtPage, last: lastPage });
  }
  const handlerSetCurrent = (pagina) => {
    setPage(pagina);
  };
  const handlerPreviousPage = () => {
    setPage(currentPage - 1);
  };
  const handlerNextPage = () => {
    setPage(currentPage + 1);
  };

  const listPage = pageNumber
    ?.map((nPage) => {
      return (
        <li className={style.containerPage} key={nPage}>
          <button
            onClick={() => handlerSetCurrent(nPage)}
            className={nPage === currentPage ? style.pageCurrent : style.page}
          >
            {nPage}
          </button>
        </li>
      );
    })
    .slice(0, cantPage);

  return (
    <div className={style.container}>
      <div className={style.containerPrevious}>
        {currentPage !== 1 && (
          <button
            onClick={handlerPreviousPage}
            className={style.buttonPrevious}
          >
            Back
          </button>
        )}
      </div>
      <div className={style.containerPaginado}>
        <ul className={style.paginado}>{listPage}</ul>
      </div>
      <div className={style.containerNext}>
        {currentPage !== cantPage && (
          <button onClick={handlerNextPage} className={style.buttonNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
