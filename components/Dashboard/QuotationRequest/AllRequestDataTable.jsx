"use client";

import DataTable from "./DataTable";

const AllRequestDataTable = ({tableData, quotationActionSubmit}) => {
  
  return <div>
    <DataTable tableData={tableData} quotationActionSubmit={quotationActionSubmit} />
  </div>;
};

export default AllRequestDataTable;
