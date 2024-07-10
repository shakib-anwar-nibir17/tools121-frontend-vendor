"use client";

import { useGetProductListQuery } from "@/app/redux/features/inventoryProduct";
import AddProductsForm from "@/components/Dashboard/ProductList/AddProductsForm";
import NoProducts from "@/components/Dashboard/ProductList/NoProducts";
import ProductListTable from "@/components/Dashboard/ProductList/ProductListTable";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ProductList = () => {
  const token = localStorage.getItem('vendorToken')
  const [products, setProducts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { data: productList, refetch:refetchProduct } = useGetProductListQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetchProduct()
  },[token])

  console.log("product list ==>", productList, token)
  // console.log("token ==>", token)

  return (
    <div>
      {showForm && <AddProductsForm setShowForm={setShowForm} />}
      <div className="max-w-[1189px] flex justify-between">
        <div className="w-[540px]">
          <SearchInput />
        </div>
        {!showForm && (
          <div className="flex gap-4">
            <Button className="text-xl px-6 bg-white text-primary-900 border border-primary-900">
              Cancel
            </Button>
            <Button onClick={() => setShowForm(true)} className="text-xl px-6">
              Add Products
            </Button>
          </div>
        )}
      </div>
      <ProductListTable productData={productList?.data?.supplier_products}/>
      {products && <NoProducts setProducts={setProducts} />}
    </div>
  );
};

export default ProductList;
