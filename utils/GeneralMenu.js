import { BsBoxes, BsCart3 } from "react-icons/bs";
import { GrDocumentPerformance, GrDocumentText } from "react-icons/gr";
import { IoHeadsetOutline } from "react-icons/io5";
import { LiaUserTieSolid } from "react-icons/lia";
import { PiSquaresFour, PiUsersThreeLight } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

const GeneralMenu = [
  {
    menu: "Dashboard",
    icons: PiSquaresFour,
    route: "dashboard",
    value: "dashboard",
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
    ],
    route: "quotation-request",
  },
  {
    menu: "Orders",
    icons: BsCart3,
    submenu: [],
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
        subRoute: "product-request-list",
        value: "product-request-list",
      },
    ],
    route: "inventory",
  },
  {
    menu: "CRM",
    icons: PiUsersThreeLight,
    submenu: [],
    route: "crm",
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
    route: "advertisement",
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
