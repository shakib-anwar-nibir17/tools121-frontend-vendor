/* eslint-disable no-unused-vars */
"use client";
import { useStateContext } from "@/utils/contexProvider";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

const PaginationServerside = ({ totalPage,
  pagiNateHandler }) => {
  // console.log('pagination totalPage', totalPage);
  const { perpageCount, setPerpageCount, currentPage, setCurrentPage, pageCount, setPageCount } =
    useStateContext();
  // const [perPageCount, setPerPageCount] = useState(10);

  // const offset = currentPage * perPageCount;
  // console.log('offset', offset);

  useEffect(() => {
    setPageCount(Math.ceil(parseInt(totalPage) / perpageCount));
  }, [totalPage, perpageCount]);

  
  function handlePageClick({ selected: selectedPage }) {
    console.log("Selected Page", selectedPage);
    pagiNateHandler(selectedPage, perpageCount)
    setCurrentPage(selectedPage);
  }

  const rows = [10, 25, 50, 100];

  return (
    <div className="md:flex justify-between items-center">
      {/* {totalPage && (
          <p className="text-gray-400">
            Showing {totalPage?.length === 0 ? 0 : pageData?.length} of{' '}
            {totalPage?.length} entires
          </p>
        )} */}

      <div className="flex justify-between items-center">
        {totalPage > 10 && (
          <select
            type="number"
            name=""
            id=""
            value={perpageCount}
            onChange={(e) => {
              setPerpageCount(parseInt(e.target.value));
              setCurrentPage(0);
              pagiNateHandler(currentPage, parseInt(e.target.value))
            }}
            className="w-25 text-left px-2 mx-2 h-10"
          >
            {rows?.map((row, index) => (
              <option value={row} key={index}>
                {row} / page
              </option>
            ))}
          </select>
        )}
        <div className=" px-4 flex justify-between items-center">
          <ReactPaginate
            forcePage={currentPage}
            previousLabel={
              <>
                {pageCount > 1 ? (
                  <>
                    <span className="sr-only">Previous</span>
                    <FaChevronLeft size={25} className="mt-2" />
                  </>
                ) : (
                  <FaChevronLeft size={12} className="hidden" />
                )}
              </>
            }
            nextLabel={
              <>
                {pageCount > 1 ? (
                  <>
                    <span className="sr-only">Next</span>
                    <FaAngleRight size={25} className="mt-2" />
                  </>
                ) : (
                  <FaAngleRight size={12} className="hidden" />
                )}
              </>
            }
            pageCount={pageCount}
            onPageChange={handlePageClick}
            // containerClassName="relative z-0 flex rounded-md shadow-sm space-x-2 ml-auto"
            // pageClassName="bg-white text-white hover:bg-[#0d6efd] relative flex items-center text-sm font-medium"
            // activeClassName={
            //   pageCount > 1
            //     ? 'z-10 bg-[#0d6efd] border border-[#0d6efd] text-white relative flex items-center text-sm font-medium'
            //     : 'hidden'
            // }
            // pageLinkClassName={
            //   pageCount > 1
            //     ? 'z-10 text-black border border-[#0d6efd] relative flex items-center px-4 py-2 text-sm font-medium'
            //     : 'hidden'
            // }
            // breakLabel="..."
            // marginPagesDisplayed={2}
            // pageRangeDisplayed={3}
            containerClassName="relative z-0 flex rounded-md shadow-sm space-x-2 ml-auto"
            pageClassName="bg-blue-300 text-black hover:bg-blue-600 relative flex items-center text-sm font-medium"
            activeClassName="z-10 bg-blue-600 border border-bg-blue-600 text-white relative flex items-center text-sm font-medium"
            pageLinkClassName="relative flex items-center px-4 py-2 text-sm font-medium"
            breakLabel="..."
            breakClassName="z-10 text-black border border-[#0d6efd] relative flex items-center px-4 py-2 text-sm font-medium"
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
          />
        </div>

        {/* {pageCount > 1 && (
            <>
              <p className="p-2">Go to</p>
              <input
                // onChange={(e) => e.target.value}
                onChange={(e) =>
                  handleOnChangePageClick(parseInt(e.target.value))
                }
                type="number"
                min={1}
                max={pageCount}
                className="w-20 px-1 py-1.5 border border-solid focus:text-gray-700 focus:border-blue-600 focus:outline-none"
              />
            </>
          )} */}
      </div>
    </div>
  );
};

export default PaginationServerside;
