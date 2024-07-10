"use client";

import {  useLazyGetSingleProductQuery } from "@/app/redux/features/inventoryProduct";
import AddProductsForm from "@/components/Dashboard/ProductList/AddProductsForm";
import { useEffect, useState } from "react";

const ProductList = ({params}) => {
  const token = localStorage.getItem('vendorToken')
  const [showForm, setShowForm] = useState(false);

//console.log("product list ==>", productList?.data?.supplier_products)
// console.log("params ==>", params)
 // ----------Editing Functionality -----------//
 const [triggerSingleProduct, { data: singleProductData, error, isLoading }] = useLazyGetSingleProductQuery();

 useEffect(() => {
   if(params?.id){
    triggerSingleProduct({id: params?.id, token: token})
   }
 },[params?.id])

 console.log("singleProductData ==>", singleProductData)
 
  return (
    <div>
        <AddProductsForm paramsId={params?.id} singleProductData={singleProductData?.data} setShowForm={setShowForm} />
    </div>
  );
};

export default ProductList;
