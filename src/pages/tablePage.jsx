import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import Feed from "../components/Feed";
import { useEffect, useState } from "react";
import EditItem from "../components/EditItem";
import Cart from "../components/Cart";
import {
  PAYMENT_METHODS,
  TABLE_STATUS,
  createTable,
  generateID,
} from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { tablesActions } from "../state";
import { setTable } from "../firebase";

function OpenTable({ openTable }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const customerName = form.get("customerName");
    const customers = Number(form.get("customers"));
    openTable({
      customerName,
      customers,
    });
  };
  return (
    <form
      className="flex grow flex-col gap-2 items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full max-w-sm">
        <div className="opacity-60">Customer's Name</div>
        <div className="flex join rounded-none">
          <input
            type="text"
            className="join-item input w-full"
            name="customerName"
          />
        </div>
      </div>
      <div className="w-full max-w-sm">
        <div className="opacity-60">Number of customers</div>
        <div className="flex join rounded-none">
          <input
            type="number"
            className="join-item input w-full"
            name="customers"
            required
          />
        </div>
      </div>

      <button
        className="btn w-full max-w-sm rounded-none btn-primary"
        type="submit"
      >
        Open
      </button>
    </form>
  );
}

class CachedArray {
  constructor(key) {
    this.key = key;
    if (localStorage.getItem(this.key) === null) this.set([]);
  }
  get() {
    return JSON.parse(localStorage.getItem(this.key));
  }
  set(value) {
    const newData = JSON.stringify(value);
    localStorage.setItem(this.key, newData);
  }
  clear() {
    localStorage.removeItem(this.key);
    this.set([]);
  }
}

function useTable() {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const table = useSelector((state) =>
    state.tables.find((table) => table.tableNumber === Number(tableNumber))
  );

  const cachedItems = new CachedArray("CACHED_ITEMS_OF_TABLE: " + tableNumber);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems([...table.cartItems, ...cachedItems.get()]);
  }, [table, tableNumber]);

  useEffect(() => {
    cachedItems.set(cartItems.filter((item) => !item.sent));
  }, [cartItems]);

  // table functions
  const openTable = (entries) =>
    setTable(
      createTable({
        ...entries,
        tableNumber: table.tableNumber,
        status: TABLE_STATUS.open,
      })
    );

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
    setTable(
      createTable({
        tableNumber: table.tableNumber,
        status: TABLE_STATUS.closing,
      })
    );
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
              editedItem,
              edited: true,
              sent: false,
            }
          : item
      )
    );
  const removeItemFromCart = (item) =>
    setCartItems(
      cartItems.map((i) =>
        i._id === item._id ? { ...i, removed: true, sent: false } : i
      )
    );

  const sendCart = () => {
    cachedItems.clear();
    const sentItems = cartItems
      .filter((item) => !item.removed)
      .map((item) => (item.sent ? item : { ...item, sent: true }));
    setCartItems(sentItems);
    setTable({
      ...table,
      cartItems: sentItems,
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

function useItemSelector(initial = null) {
  const [selectedItem, setSelectedItem] = useState(null);
  const selectItem = (item, isSelected) =>
    setSelectedItem(isSelected ? null : item);
  const isSelectedItem = (item) => {
    if (!selectedItem) return false;
    return selectedItem._id === item._id;
  };
  const cancelEdit = () => setSelectedItem(null);
  return {
    selectedItem,
    selectItem,
    isSelectedItem,
    cancelEdit,
  };
}

export default function TablePage() {
  const {
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
  } = useTable();

  const { selectedItem, selectItem, isSelectedItem, cancelEdit } =
    useItemSelector();

  return (
    <Layout>
      <TopPanel backHref={"/tables"} userName={"Ajmir Raziqi"}>
        <span>Table:{tableNumber}</span>
        <span>Customers:{table.customers}</span>
      </TopPanel>
      {table.status === TABLE_STATUS.close ? (
        <OpenTable openTable={openTable} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {/* table actions + item working element */}
          <div className="md:col-span-2 flex flex-col gap-2">
            {/* table actions */}
            <div className="flex gap-2">
              <div
                className="btn rounded-none grow w-auto btn-outline btn-sm btn-primary"
                onClick={closeTable}
              >
                Pay
              </div>

              <div
                className="btn rounded-none grow w-auto btn-outline btn-sm btn-success"
                onClick={printReceipt}
              >
                Reciept
              </div>
              <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-error">
                Edit
              </div>
              <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-info">
                More
              </div>
            </div>
            {/* Editing an element */}
            {selectedItem && (
              <EditItem
                item={selectedItem}
                cancelEdit={cancelEdit}
                editItemFromCart={editItemFromCart}
                removeItemFromCart={removeItemFromCart}
              />
            )}
            <div className={selectedItem ? "hidden" : "block"}>
              {/* table feed */}
              <Feed addItemToCart={addItemToCart} />
            </div>
          </div>
          {/* table cart */}
          <Cart
            cartItems={cartItems}
            isSelectedItem={isSelectedItem}
            setSelectedItem={selectItem}
            sendCart={sendCart}
          />
        </div>
      )}
    </Layout>
  );
}
