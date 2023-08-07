import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ITEM_TYPE,
  ORDER_STATUS,
  TABLE_STATUS,
  createTable,
  generateID,
} from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, setTable } from "../firebase";
import { tablesActions } from "../state/tablesReducer";

export default function useTable() {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      hasStarter: false,
      starterSent: false,
      status: TABLE_STATUS.open,
      createdAt: Number(new Date()),
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
  const addItemToCart = (item) => {
    setTable({
      ...table,
      cartItems: [
        ...cartItems,
        {
          ...item,
          _id: generateID(),
          sent: false,
        },
      ],
    });
  };
  const editItemFromCart = (editedItem) =>
    setTable({
      ...table,
      cartItems: cartItems.map((item) =>
        item._id === editedItem._id
          ? {
              ...editedItem,
              edited: true, // this is to tell the kichen that it was sent once
              sent: false,
            }
          : item
      ),
    });

  const removeItemFromCart = (itemA) =>
    setTable({
      ...table,
      cartItems: cartItems.filter((itemB) => itemB._id !== itemA._id),
    });

  const sendCart = (mains) => {
    let unsentItems = [];
    const addItem = (item) => unsentItems.push({ ...item, sent: true });
    table.cartItems.forEach((item) => {
      if (item.sent) return;
      // if not food
      if (item.type !== ITEM_TYPE.food) return addItem(item);
      // if food
      if (!mains && item.starter) return addItem(item);
      if (mains && !item.starter) return addItem(item);
    });

    let newItems = table.cartItems.map(
      (item) => unsentItems.find((i) => i._id === item._id) || item
    );

    setTable({
      ...table,
      starter: newItems.some((item) => item.starter),
      cartItems: newItems,
    });

    // --------------- sent other to the kitchen and bar
    addOrder({
      _id: generateID(),
      cartItems: unsentItems,
      tableNumber: table.tableNumber,
      customers: table.customers,
      sentAt: Number(new Date()),
      status: ORDER_STATUS.waiting,
      types: unsentItems.reduce((list, item) => {
        if (list.includes(item.type)) return list;
        return [...list, item.type];
      }, []),
    });
  };

  const saveCart = () => {
    const newItems = [];
    const addItem = (item) => {
      const newItem = {
        ...item,
        saved: true,
      };
      newItems.push(newItem);
      return newItem;
    };
    const newCartItems = cartItems
      .filter((item) => !item.removed)
      .map((item) => (item.sent ? item : addItem(item)));
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
    saveCart,
    sendCart,
  };
}
