import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

function ComplexPaginationContainer() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;

  function handlePageChange(pageNumber) {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  function addPageButton({ pageNumber, activeClass }) {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300 ' : ''
        }`}
      >
        {pageNumber}
      </button>
    );
  }

  function renderPageButtons() {
    const pageButtons = [];
    // page đầu
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    if (page > 2) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
          ...
        </button>
      );
    }

    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    if (page < pageCount - 1)
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-md" key="dots-12">
          ...
        </button>
      );

    // page cuối
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
  }

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ComplexPaginationContainer;
