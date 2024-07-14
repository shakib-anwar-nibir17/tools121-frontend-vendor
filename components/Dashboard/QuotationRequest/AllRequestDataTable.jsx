"use client";

import { useSupplierQuotationListQuery } from "@/app/redux/features/supplierQuotation";
import DataTable from "./DataTable";

const AllRequestDataTable = ({tableData}) => {
  
  return <div>
    <DataTable tableData={tableData} />
  </div>;
};

export default AllRequestDataTable;
