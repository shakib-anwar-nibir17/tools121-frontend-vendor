import { FlameSVG } from "@/components/icons/Icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TopSellingItems = ({ items, totalData, loadMoreHandler }) => {
  return (
    <div className="border border-slate-300 box-border rounded-2xl shadow-custom-shadow w-full xl:w-1/2">
      <div className="px-8 py-6 border-b-2 border-slate-200">
        <h1 className="text-lg font-bold text-black flex items-center gap-2">
          <span>
            <FlameSVG />
          </span>
          Top Selling Items
        </h1>
      </div>
      <div className="px-8 mt-8">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-50 text-black font-bold px-4 py-5">
              <TableHead className="w-[10%] rounded-l-lg">--</TableHead>
              <TableHead className="w-[70%]">Product Name</TableHead>
              <TableHead className="w-[20%] rounded-r-lg text-center">
                Conversion Rate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b-2 border-slate-200">
            {items?.map((product, idx) => (
              <TableRow
                className="text-black font-bold border-b-2 border-slate-200"
                key={idx}
              >
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{product?.name}</TableCell>
                <TableCell className="text-center">
                  {product?.conversion_rate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalData > 10 && (
        <div className="mt-11 mb-7 text-primary-900 text-lg underline flex justify-center">
          <button onClick={loadMoreHandler}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default TopSellingItems;
