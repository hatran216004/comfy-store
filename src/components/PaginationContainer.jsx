import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
/*
  const searchParams = new URLSearchParams();
  searchParams.set('page', 2);
  searchParams.set('sort', 'asc');
  console.log(searchParams.toString());
  // Output: "page=2&sort=asc"

*/
function PaginationContainer() {
  const { meta } = useLoaderData();
  const { pageCount, page: currentPage } = meta.pagination;
  console.log(currentPage);
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  function handlePageChange(pageNumber) {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  function handlePrevPage() {
    if (currentPage <= 1) return;
    handlePageChange(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage >= pageCount) return;
    handlePageChange(currentPage + 1);
  }

  // Số lượng trang < 2
  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        {Array(pageCount)
          .fill(0)
          .map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={index}
                className={`btn btn-xs sm:btn-md border-none join-item ${
                  pageNumber === currentPage
                    ? 'bg-base-300 border-base-300'
                    : ''
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationContainer;
