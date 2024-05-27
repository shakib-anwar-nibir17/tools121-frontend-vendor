import { FlameSVG } from "@/components/icons/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const productArray = [
  {
    _id: 1,
    name: "RIG-BS-6025RF Research Upright Metallurgical Microscope",
    conversion_rate: 25,
  },
  {
    _id: 2,
    name: "ZEISS Axio Vert.A1 Inverted Metallurgical Microscope",
    conversion_rate: 30,
  },
  {
    _id: 3,
    name: "Nikon ECLIPSE LV100N POL Polarizing Microscope",
    conversion_rate: 20,
  },
  {
    _id: 4,
    name: "Olympus GX53 Inverted Metallurgical Microscope",
    conversion_rate: 28,
  },
  {
    _id: 5,
    name: "Leica DM2700 M Upright Metallurgical Microscope",
    conversion_rate: 22,
  },
  {
    _id: 6,
    name: "Mitutoyo FS70 Inspection Metallurgical Microscope",
    conversion_rate: 18,
  },
  {
    _id: 7,
    name: "Meiji Techno IM7500 Inverted Metallurgical Microscope",
    conversion_rate: 24,
  },
  {
    _id: 8,
    name: "AmScope 40X-2500X LED Lab Compound Microscope",
    conversion_rate: 26,
  },
  {
    _id: 9,
    name: "Motic BA310MET-T Trinocular Metallurgical Microscope",
    conversion_rate: 21,
  },
  {
    _id: 10,
    name: "BRESSER Science ADL-601F Inverted Microscope",
    conversion_rate: 27,
  },
];

const TopSellingItems = () => {
  return (
    <div className="border border-slate-300 box-border rounded-2xl shadow-custom-shadow w-1/2">
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
            {productArray.map((product, idx) => (
              <TableRow
                className="text-black font-bold border-b-2 border-slate-200"
                key={product._id}
              >
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-center">
                  {product.conversion_rate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-11 mb-7 text-primary-900 text-lg underline flex justify-center">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default TopSellingItems;
