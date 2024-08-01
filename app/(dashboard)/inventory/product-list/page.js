/* eslint-disable no-unused-vars */
"use client";

import { useLazyGetProductListQuery } from "@/app/redux/features/inventoryProduct";
import AddProductsForm from "@/components/Dashboard/ProductList/AddProductsForm";
import NoProducts from "@/components/Dashboard/ProductList/NoProducts";
import ProductListTable from "@/components/Dashboard/ProductList/ProductListTable";
import Loader from "@/components/common/Loader";
import PaginationCom from "@/components/common/PaginationCom";
import PaginationServerside from "@/components/common/PaginationServerside";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/utils/contexProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductList = () => {
  const router = useRouter();
  const token = localStorage.getItem("vendorToken");
  const [showForm, setShowForm] = useState(false);
  const [triggerProductList, { data: productList, error, isLoading , isFetching}] = useLazyGetProductListQuery();

  const { setPerpageCount, setCurrentPage } = useStateContext();
  const [allProduct, setAllProduct] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    triggerProductList({querys: `limit=${10}&&offset=${0}`});
  }, []);

  console.log("product list ==>", productList);
  // console.log("token ==>", token)
  const buttonHandler = () => {
    setShowForm(true);
  };

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
    setPerpageCount(10)
  }, []);

  useEffect(() => {
    if(productList?.data?.page?.length > 0){
      setAllProduct(productList?.data?.page)
      setTotalPage(productList?.data?.paginate?.total)
    }
    else{
      setAllProduct([])
      setTotalPage(0)
    }
  }, [productList?.data?.page , productList?.data?.page?.length]);

  const onSearchHandler = (text) => {
    if (text?.length > 2) {

      console.log("calling --->", text);
      
      setSearchText(text);
      setTimeout(() => {
        triggerProductList({querys: `limit=${10}&&offset=${0}&&search_key=${text}`})
      },500)
    } else {
      triggerProductList({querys: `limit=${10}&&offset=${0}`});
    }
  };
  

  const pagiNateHandler = (pageNo, perpageCount) => {
    triggerProductList({querys: `limit=${perpageCount}&&offset=${pageNo}`})
  }

  return (
    <div>
      {showForm && <AddProductsForm setShowForm={setShowForm} />}
      <div className="max-w-[1189px] flex justify-between">
        <div className="w-[540px]">
          <SearchInput onSearchHandler={onSearchHandler} />
        </div>
        {!showForm && (
          <div className="flex gap-4">
            {/* <Button className="text-xl px-6 bg-white text-primary-900 border border-primary-900">
              Cancel
            </Button> */}
            <Button onClick={() => setShowForm(true)} className="text-xl px-6">
              Add Products
            </Button>
          </div>
        )}
      </div>
      {isFetching ? (
       <div className="h-[700px] w-full flex flex-row justify-center items-center">
           <Loader />
       </div>
      ) : (
        <div className="w-full py-2">
          {productList?.data?.page?.length > 0 ? (
            <ProductListTable productData={allProduct} />
          ) : (
            <NoProducts
              title="No Inventory Yet?"
              suggestion="Add new products from your store and start selling."
              buttonHandler={buttonHandler}
            />
          )}
          
        </div>
      )}
      {
        totalPage > 0 && <PaginationServerside pagiNateHandler={pagiNateHandler} totalPage={totalPage}/>
      }
    </div>
  );
};

export default ProductList;
