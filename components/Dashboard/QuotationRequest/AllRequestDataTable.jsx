"use client";

import DataTable from "./DataTable";

const AllRequestDataTable = ({tableData, quotationActionSubmit,from, 
  setReplyId, replyId, repleyHandler, setReplyText}) => {
  
  return <div>
    <DataTable 
    setReplyId={setReplyId}
    replyId={replyId}
    tableData={tableData} quotationActionSubmit={quotationActionSubmit} 
    from={from} repleyHandler={repleyHandler} setReplyText={setReplyText}/>
  </div>;
};

export default AllRequestDataTable;
