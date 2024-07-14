"use client";

import { useSupplierQuotationListQuery } from "@/app/redux/features/supplierQuotation";
import DataTable from "./DataTable";

const AllRequestDataTable = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: supplierQuotationList } = useSupplierQuotationListQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  const tableData = supplierQuotationList?.data?.quotations;

  console.log("Supplier Quotation =====>", supplierQuotationList);
  console.log(tableData);
  return <div>{tableData.length > 0 && <DataTable data={tableData} />}</div>;
};

export default AllRequestDataTable;
