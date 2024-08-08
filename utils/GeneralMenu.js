import { BsBoxes, BsCart3, BsChatSquareText } from "react-icons/bs";
import { GrDocumentPerformance, GrDocumentText } from "react-icons/gr";
import { IoHeadsetOutline } from "react-icons/io5";
import { LiaUserTieSolid } from "react-icons/lia";
import { PiSquaresFour } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

const GeneralMenu = [
  {
    menu: "Dashboard",
    icons: PiSquaresFour,
    route: "dashboard",
    value: "dashboard",
  },
  {
    menu: "Reviews",
    icons: BsChatSquareText,
    route: "reviews",
    value: "reviews",
  },
  {
    menu: "Quotation Request",
    icons: GrDocumentText,
    submenu: [
      {
        name: "All Request",
        subRoute: "quotation-request/all-request",
        value: "all-request",
      },
      {
        name: "Universal Quotation",
        subRoute: "quotation-request/universal-quotation",
        value: "universal-quotation",
      },
    ],
    route: "quotation-request",
  },
  {
    menu: "Orders",
    icons: BsCart3,
    submenu: [
      {
        name: "Create New Order",
        subRoute: "orders/create-new-orders",
        value: "createNewOrder",
      },
      {
        name: "Invoice List",
        subRoute: "orders/invoice-list",
        value: "invoiceList",
      },
    ],
    route: "orders",
  },
  {
    menu: "Inventory",
    icons: BsBoxes,
    submenu: [
      {
        name: "Product List",
        subRoute: "inventory/product-list",
        value: "productList",
      },
      {
        name: "Product Request Form",
        subRoute: "inventory/product-request-form",
        value: "product-form",
      },
      {
        name: "Product Request List",
        subRoute: "inventory/product-request-list",
        value: "product-request-list",
      },
    ],
    route: "inventory",
  },
  {
    menu: "Traffic Analytics",
    icons: GrDocumentPerformance,
    route: "traffic-analytics",
    value: "traffic-analytics",
  },
  {
    menu: "Advertising",
    icons: LiaUserTieSolid,
    value: "advertising",
    route: "advertising",
  },
  {
    menu: "Subscription",
    icons: TbReportSearch,
    value: "subscription",
    route: "subscription",
  },
  {
    menu: "Support",
    icons: IoHeadsetOutline,
    value: "support",
    route: "support",
  },
];

export default GeneralMenu;
