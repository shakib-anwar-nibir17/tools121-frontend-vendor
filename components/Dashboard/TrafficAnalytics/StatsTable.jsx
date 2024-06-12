import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const ProductList = [
  {
    _id: 1,
    pages: "Home / Tools and Equipment / Industrial Machinery",
    visits: 10900,
    users: 3009,
    percentage: 36,
  },
  {
    _id: 2,
    pages: "Home / Tools and Equipment / Power Tools",
    visits: 8700,
    users: 2430,
    percentage: 28,
  },
  {
    _id: 3,
    pages: "Home / Tools and Equipment / Hand Tools",
    visits: 6400,
    users: 1892,
    percentage: 29.5,
  },
  {
    _id: 4,
    pages: "Home / Tools and Equipment / Safety Gear",
    visits: 5900,
    users: 1745,
    percentage: 29.5,
  },
  {
    _id: 5,
    pages: "Home / Tools and Equipment / Welding Equipment",
    visits: 7100,
    users: 2115,
    percentage: 29.8,
  },
  {
    _id: 6,
    pages: "Home / Tools and Equipment / Automotive Tools",
    visits: 4800,
    users: 1370,
    percentage: 28.5,
  },
  {
    _id: 7,
    pages: "Home / Tools and Equipment / Electrical Tools",
    visits: 5300,
    users: 1555,
    percentage: 29.3,
  },
  {
    _id: 8,
    pages: "Home / Tools and Equipment / Plumbing Tools",
    visits: 4500,
    users: 1260,
    percentage: 28,
  },
  {
    _id: 9,
    pages: "Home / Tools and Equipment / Construction Tools",
    visits: 6200,
    users: 1810,
    percentage: 29.2,
  },
  {
    _id: 10,
    pages: "Home / Tools and Equipment / Garden Tools",
    visits: 4000,
    users: 1100,
    percentage: 27.5,
  },
];

const StatsTable = () => {
  return (
    <Table className="mt-6">
      <TableHeader>
        <TableRow className="bg-primary-50 font-bold text-black rounded-l-lg">
          <TableHead>Pages</TableHead>
          <TableHead className="text-center">Visits</TableHead>
          <TableHead>Users</TableHead>
          <TableHead>Visits(%)</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b-2 border-slate-200">
        {ProductList.map((product) => (
          <TableRow
            className="text-black border-b-2 border-slate-200"
            key={product._id}
          >
            <TableCell className="w-[30%]">{product.pages}</TableCell>
            <TableCell className="text-center text-gray-500 w-[15%]">
              {product.visits}
            </TableCell>
            <TableCell className=" text-gray-500 w-[15%]">
              {product.users}
            </TableCell>
            <TableCell className=" text-gray-500 w-[25%]">
              {product.percentage} %
              <Progress value={product.percentage} />
            </TableCell>
            <TableCell className="w-[15%]">
              <button className="text-primary-900">View More</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatsTable;
