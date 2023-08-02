import { PAYMENT_METHODS, TABLE_STATUS, getListOfTables } from "../utils";

export const initialTables = getListOfTables(40);

export const tablesActions = {
  openTable: "OPEN_TABLE",
  addItem: "ADD_ITEM",
  updateTable: "UPDATE_TABLE",
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
    case tablesActions.addItem:
      return state.map((table) => {
        if (table.tableNumber === payload.tableNumber)
          return {
            ...table,
            cartItems: [...table.cartItems, payload.item],
          };
        return table;
      });

    case tablesActions.updateTable:
      return state.map((table) => {
        if (table.tableNumber === payload.tableNumber) {
          return payload;
        }
        return table;
      });

    default:
      return state;
  }
}
