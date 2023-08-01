import { Link } from "react-router-dom";
import TopPanel from "../components/TopPanel";
import {
  PAYMENT_METHODS,
  TABLE_STATUS,
  classes,
  conditionalClasses,
} from "../utils";

export default function TablesPage() {
  const tables = [
    {
      status: TABLE_STATUS.open,
      customers: 3,
      tableNumber: 1,
      discountAmount: null,
      paymentMethod: PAYMENT_METHODS.cash,
      createdTime: null,
      cartItems: [],
      totalPrice: 0,
      discount: {
        has: false,
        percentage: 0,
      },
    },
    {
      status: TABLE_STATUS.close,
      customers: 0,
      tableNumber: 2,
      discountAmount: null,
      paymentMethod: PAYMENT_METHODS.cash,
      createdTime: null,
      cartItems: [],
      totalPrice: 0,
      discount: {
        has: false,
        percentage: 0,
      },
    },
    {
      status: TABLE_STATUS.open,
      customers: 4,
      tableNumber: 3,
      discountAmount: null,
      paymentMethod: PAYMENT_METHODS.cash,
      createdTime: null,
      cartItems: [],
      totalPrice: 0,
      starter: true,
      discount: {
        has: false,
        percentage: 0,
      },
    },
    {
      status: TABLE_STATUS.closing,
      customers: 4,
      tableNumber: 4,
      discountAmount: null,
      paymentMethod: PAYMENT_METHODS.cash,
      createdTime: null,
      cartItems: [],
      totalPrice: 0,
      discount: {
        has: false,
        percentage: 0,
      },
    },
    {
      status: TABLE_STATUS.break,
      customers: 2,
      tableNumber: 5,
      discountAmount: null,
      paymentMethod: PAYMENT_METHODS.cash,
      createdTime: null,
      cartItems: [],
      totalPrice: 0,
      starter: true,

      discount: {
        has: false,
        percentage: 0,
      },
    },
  ];
  return (
    <div className="flex flex-col">
      <TopPanel backHref={"/"} userName={"Ajmir Raziqi"}>
        <span>Tables:2</span>
        <span>Customers:4</span>
      </TopPanel>
      <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
        {tables.map((table) => (
          <Link
            to={`/table/${table.tableNumber}`}
            className={classes(
              "btn h-20 sm:h-24  w-20 sm:w-24 text-2xl sm:text-4xl relative",
              conditionalClasses(table.status, {
                [TABLE_STATUS.close]: "btn-ghost",
                [TABLE_STATUS.open]: "btn-primary",
                [TABLE_STATUS.closing]: "btn-warning",
                [TABLE_STATUS.break]: "btn-accent",
              }),
              table.starter && " border-b-error border-b-4"
            )}
            key={table.tableNumber}
          >
            {table.tableNumber}
            <span className="text-xs  absolute top-2 left-2">45 mins</span>
            <span className="text-xs  absolute bottom-2 right-2">
              {table.customers}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
