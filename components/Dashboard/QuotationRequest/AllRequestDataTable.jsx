"use client";

import DataTable from "./DataTable";

const AllRequestDataTable = ({tableData, quotationActionSubmit,from}) => {
  
  return <div>
    <DataTable tableData={tableData} quotationActionSubmit={quotationActionSubmit} from={from} />
  </div>;
};

export default AllRequestDataTable;
