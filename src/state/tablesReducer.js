import { PAYMENT_METHODS, TABLE_STATUS } from "@/utils";

export const initialTables = [
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
];

export const tablesActions = {
  openTable: "OPEN_TABLE",
  addItem: "ADD_ITEM",
};

export function tablesReducer(state = initialTables, { type, payload }) {
  switch (type) {
    case tablesActions.openTable:
      const { customers, tableNumber, customerName } = payload;
      return state.map((table) => {
        if (table.tableNumber === tableNumber)
          return {
            tableNumber,
            customers,
            customerName,
            status: TABLE_STATUS.open,
            discountAmount: null,
            paymentMethod: PAYMENT_METHODS.cash,
            createdTime: null,
            cartItems: [],
            totalPrice: 0,
            discount: {
              has: false,
              percentage: 0,
            },
          };
        return table;
      });

    default:
      return state;
  }
}
