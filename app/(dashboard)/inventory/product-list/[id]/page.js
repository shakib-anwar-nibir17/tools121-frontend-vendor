/* eslint-disable no-unused-vars */
"use client";

import { useLazyGetSingleProductQuery } from "@/app/redux/features/inventoryProduct";
import Loader from "@/components/common/Loader";
import AddProductsForm from "@/components/Dashboard/ProductList/AddProductsForm";
import { useEffect, useState } from "react";

const ProductList = ({ params }) => {
  const token = localStorage.getItem("vendorToken");
  const [showForm, setShowForm] = useState(false);

  //console.log("product list ==>", productList?.data?.supplier_products)
  // console.log("params ==>", params)
  // ----------Editing Functionality -----------//
  const [
    triggerSingleProduct,
    { data: singleProductData, error, isLoading, isFetching },
  ] = useLazyGetSingleProductQuery();

  useEffect(() => {
    if (params?.id) {
      triggerSingleProduct({ id: params?.id, token: token });
    }
  }, [params?.id, token, triggerSingleProduct]);

  console.log("singleProductData ==>", singleProductData);

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <AddProductsForm
          paramsId={params?.id}
          singleProductData={singleProductData?.data}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default ProductList;
