import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TABLE_STATUS, createTable, generateID } from "../utils";
import { useSelector } from "react-redux";
import { addOrder, setTable } from "../firebase";

export default function useTable() {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const table = useSelector((state) =>
    state.tables.find((table) => table.tableNumber === Number(tableNumber))
  );

  const [cartItems, setCartItems] = useState(table.cartItems);

  useEffect(() => setCartItems(table.cartItems), [table]);

  // table functions
  const openTable = (entries) =>
    setTable({
      ...table,
      ...entries,
      status: TABLE_STATUS.open,
    });

  const updateTable = (table) => setTable(table);

  const closeTable = () => {
    navigate("/tables");
    setTable(
      createTable({
        tableNumber: table.tableNumber,
        status: TABLE_STATUS.close,
      })
    );
  };

  const printReceipt = () => {
    setTable({
      ...table,
      status: TABLE_STATUS.closing,
    });
  };

  // item functions
  const addItemToCart = (item) =>
    setCartItems([
      ...cartItems,
      {
        ...item,
        _id: generateID(),
        sent: false,
      },
    ]);
  const editItemFromCart = (editedItem) =>
    setCartItems(
      cartItems.map((item) =>
        item._id === editedItem._id
          ? {
              ...editedItem,
              edited: true,
              sent: false,
            }
          : item
      )
    );
  const removeItemFromCart = (item) =>
    setCartItems(
      cartItems.map((i) =>
        i._id === item._id
          ? { ...i, removed: true, sent: false, totalPrice: 0 }
          : i
      )
    );

  const sendCart = () => {
    const newItems = [];
    const addItem = (item) => {
      const sentItem = { ...item, sent: true };
      newItems.push(sentItem);
      return sentItem;
    };
    const newCartItems = cartItems
      .filter((item) => !item.removed)
      .map((item) => (item.sent ? item : addItem(item)));
    // --------------- sent other to the kitchen and bar
    addOrder({
      _id: generateID(),
      cartItems: newItems,
      tableNumber: table.tableNumber,
      customers: table.customers,
      sentAt: Number(new Date()),
      types: newItems.reduce((list, item) => {
        if (list.includes(item.type)) return list;
        return [...list, item.type];
      }, []),
    });
    // update the table
    setTable({
      ...table,
      starter: newCartItems.some((item) => item.starter),
      cartItems: newCartItems,
    });
  };

  return {
    tableNumber,
    table,
    openTable,
    updateTable,
    closeTable,
    printReceipt,
    cartItems,
    addItemToCart,
    editItemFromCart,
    removeItemFromCart,
    sendCart,
  };
}
