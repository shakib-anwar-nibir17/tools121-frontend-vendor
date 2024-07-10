'use client'
import { useStateContext } from '@/utils/contexProvider';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";

const PaginationCom = ({ array }) => {
    // console.log('pagination array', array);
  const { pageData, setPageData, currentPage, setCurrentPage } =
  useStateContext();
const [perPageCount, setPerPageCount] = useState(10);

const offset = currentPage * perPageCount;
// console.log('offset', offset);

const [pageCount, setPageCount] = useState(0);

useEffect(() => {
  setPageCount(Math.ceil(array?.length / perPageCount));
}, [array?.length, perPageCount]);

useEffect(() => {
  if (array?.length >= 10) {
    const pageItems = array?.slice(offset, offset + perPageCount);
    setPageData(pageItems);
    // console.log('pageItems', pageItems);
  } else {
    setPageData(array);
  }
}, [array, array?.length, offset, perPageCount, setPageData]);

function handlePageClick({ selected: selectedPage }) {
  console.log('Selected Page', selectedPage);
  setCurrentPage(selectedPage);
}

function handleOnChangePageClick(e) {
  const newPage = e - 1;
  if (newPage >= 0) {
    console.log('Selected Page', newPage);
    setCurrentPage(newPage);
  } else {
    setCurrentPage(0);
  }
}

const rows = [10, 25, 50, 100];


    return (
        <div className="md:flex justify-between items-center">
        {/* {array && (
          <p className="text-gray-400">
            Showing {array?.length === 0 ? 0 : pageData?.length} of{' '}
            {array?.length} entires
          </p>
        )} */}
  
        <div className="flex justify-between items-center">
        {array?.length > 10 && (
            <select
              type="number"
              name=""
              id=""
              value={perPageCount}
              onChange={(e) => {
                setPerPageCount(parseInt(e.target.value));
                setCurrentPage(0);
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
                      <FaChevronLeft  size={25} className='mt-2' />
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
                      <FaAngleRight size={25} className='mt-2' />
                    </>
                  ) : (
                    <FaAngleRight size={12} className="hidden" />
                  )}
                </>
              }
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="relative z-0 flex rounded-md shadow-sm space-x-2 ml-auto"
              pageClassName="bg-white text-white hover:bg-[#0d6efd] relative flex items-center text-sm font-medium"
              activeClassName={
                pageCount > 1
                  ? 'z-10 bg-[#0d6efd] border border-[#0d6efd] text-white relative flex items-center text-sm font-medium'
                  : 'hidden'
              }
              pageLinkClassName={
                pageCount > 1
                  ? 'z-10 text-black border border-[#0d6efd] relative flex items-center px-4 py-2 text-sm font-medium'
                  : 'hidden'
              }
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
  
  export default PaginationCom;
  