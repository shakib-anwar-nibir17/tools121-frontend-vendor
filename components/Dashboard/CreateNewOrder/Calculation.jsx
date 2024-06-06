import { TableCell, TableRow } from "@/components/ui/table";

const Calculation = () => {
  return (
    <>
      <TableRow className="text-black border-b-2 border-slate-200 h-[80px]">
        <TableCell className="font-medium"></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>SubTotal</TableCell>
        <TableCell>$ 540.00</TableCell>
      </TableRow>
      <TableRow className="text-black border-b-2 border-slate-200 h-[80px]">
        <TableCell className="font-medium"></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>Vat</TableCell>
        <TableCell>$ 540.00</TableCell>
      </TableRow>
      <TableRow className="text-black border-b-2 border-slate-200 h-[80px]">
        <TableCell className="font-medium"></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>Shipping Rate</TableCell>
        <TableCell>$ 540.00</TableCell>
      </TableRow>
      <TableRow className="text-black border-b-2 border-slate-200 h-[80px]">
        <TableCell className="font-medium"></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell className="text-lg text-black font-bold">
          Grand Total
        </TableCell>
        <TableCell>$ 540.00</TableCell>
      </TableRow>
    </>
  );
};

export default Calculation;
