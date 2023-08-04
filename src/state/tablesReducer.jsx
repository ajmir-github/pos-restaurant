import {
  PAYMENT_METHODS,
  TABLE_STATUS,
  generateID,
  getListOfTables,
} from "../utils";

export const initialTables = getListOfTables(40, true);

export const tablesActions = {
  openTable: "OPEN_TABLE",
  addItem: "ADD_ITEM",
  updateTable: "UPDATE_TABLE",
};

export function tablesReducer(state = initialTables, { type, payload }) {
  switch (type) {
    case tablesActions.openTable:
      return state.map((table) => {
        console.log(payload);
        if (table.tableNumber === payload.tableNumber) return payload;
        return table;
      });
    case tablesActions.addItem:
      return state.map((table) => {
        if (table.tableNumber === payload.table.tableNumber)
          return {
            ...table,
            cartItems: [
              ...table.cartItems,
              {
                ...payload.item,
                sent: false,
                _id: generateID(),
              },
            ],
          };
        return table;
      });

    case tablesActions.updateTable:
      return state.map((table) =>
        table.tableNumber === payload.tableNumber ? payload : table
      );

    default:
      return state;
  }
}
