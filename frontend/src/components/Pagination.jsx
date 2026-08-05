function Pagination({ page, totalPages, setPage }) {

    return (

        <div className="flex justify-center items-center gap-3 mt-8">

            <button

                disabled={page === 1}

                onClick={() => setPage(page - 1)}

                className={`px-4 py-2 rounded-lg font-medium ${
                    page === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}

            >

                Previous

            </button>

            <span className="font-semibold text-lg">

                Page {page} of {totalPages}

            </span>

            <button

                disabled={page === totalPages}

                onClick={() => setPage(page + 1)}

                className={`px-4 py-2 rounded-lg font-medium ${
                    page === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}

            >

                Next

            </button>

        </div>

    );

}

export default Pagination;