/* eslint-disable no-unused-vars */
"use client";

import { useGetProductListQuery } from "@/app/redux/features/inventoryProduct";
import AddProductsForm from "@/components/Dashboard/ProductList/AddProductsForm";
import NoProducts from "@/components/Dashboard/ProductList/NoProducts";
import ProductListTable from "@/components/Dashboard/ProductList/ProductListTable";
import Loader from "@/components/common/Loader";
import PaginationCom from "@/components/common/PaginationCom";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/utils/contexProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductList = () => {
  const router = useRouter();
  const token = localStorage.getItem("vendorToken");
  const [products, setProducts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const {
    data: productList,
    refetch: refetchProduct,
    isFetching,
  } = useGetProductListQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const { pageData, setCurrentPage } = useStateContext();
  const [allProduct, setAllProduct] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    refetchProduct();
  }, [token, refetchProduct]);

  console.log("product list ==>", productList, token);
  // console.log("token ==>", token)
  const buttonHandler = () => {
    setShowForm(true);
  };

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
  }, [setCurrentPage, productList?.data?.supplier_products?.length]);

  useEffect(() => {
    setAllProduct(pageData);
  }, [pageData]);

  const onSearchHandler = (text) => {
    if (text?.length > 2) {
      console.log("calling --->", text);
      setSearchText(text);
      const searchData = productList?.data?.supplier_products?.filter(
        (item) => {
          const searchItem = text.toLocaleLowerCase();
          return (
            item?.product_name?.toLocaleLowerCase()?.indexOf(searchItem) > -1
          );
        }
      );
      setAllProduct(searchData);
    } else {
      const sliceData = productList?.data?.supplier_products?.slice(0, 10);
      console.log(sliceData?.length);
      setAllProduct(sliceData);
    }
  };

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
        <Loader />
      ) : (
        <div className="w-full py-2">
          {productList?.data?.supplier_products?.length > 0 ? (
            <ProductListTable productData={allProduct} />
          ) : (
            <NoProducts
              title="No Inventory Yet?"
              suggestion="Add new products from your store and start selling."
              buttonHandler={buttonHandler}
            />
          )}
          <PaginationCom array={productList?.data?.supplier_products} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
