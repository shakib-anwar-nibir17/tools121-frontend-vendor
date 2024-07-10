"use client";

import { useSupplierQuotationListQuery } from "@/app/redux/features/supplierQuotation";
import DataTable from "./DataTable";

const AllRequestDataTable = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: supplierQuotationList } = useSupplierQuotationListQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  console.log("Supplier Quotation =====>", supplierQuotationList);
  return (
    <div>
      <DataTable />
    </div>
  );
};

export default AllRequestDataTable;
