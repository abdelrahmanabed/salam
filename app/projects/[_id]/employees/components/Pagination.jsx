const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;