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

  function getTabelWithStatus(table) {
    return {
      ...table,
      stats: {
        // starters
        hasStarters: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.food && item.starter
        ),
        hasSentStarters: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.food && item.starter && item.sent
        ),
        hasUnsentStarters: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.food && item.starter && !item.sent
        ),
        // mains
        hasMains: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.food && !item.starter
        ),
        hasSentMains: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.food && !item.starter && item.sent
        ),
        hasUnsentMains: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.food && !item.starter && !item.sent
        ),
        // drinks
        hasDrinks: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.drink
        ),
        hasSentDrinks: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.drink && item.sent
        ),
        hasUnsentDrinks: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.drink && !item.sent
        ),
        // desserts
        hasDesserts: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.dessert
        ),
        hasSentDesserts: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.dessert && item.sent
        ),
        hasUnsentDesserts: table.cartItems.some(
          (item) => item.type === ITEM_TYPE.dessert && !item.sent
        ),
      },
    };
  }
  function updateTable(table) {
    setTable(getTabelWithStatus(table));
  }

  // table functions
  const openTable = (entries) =>
    updateTable({
      ...table,
      ...entries,
      status: TABLE_STATUS.open,
      createdAt: Number(new Date()),
    });

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
    navigate("/print-receipt/" + tableNumber);
  };

  // item functions
  const addItemToCart = (item) => {
    updateTable({
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
    updateTable({
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
    updateTable({
      ...table,
      cartItems: cartItems.filter((itemB) => itemB._id !== itemA._id),
    });

  const sendCart = (compareFunc) => {
    let unsentItems = [];
    const addItem = (item) => unsentItems.push({ ...item, sent: true });
    table.cartItems.forEach((item) => {
      if (item.sent) return;
      if (compareFunc(item)) addItem(item);
    });

    let newItems = table.cartItems.map(
      (item) => unsentItems.find((i) => i._id === item._id) || item
    );

    updateTable({
      ...table,
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

    updateTable({
      ...table,
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
