import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import Feed from "../components/Feed";
import { useEffect, useState } from "react";
import EditItem from "../components/EditItem";
import Cart from "../components/Cart";
import { PAYMENT_METHODS, TABLE_STATUS, createTable } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { tablesActions } from "../state";
import { setTable } from "../firebase";

function OpenTable({ tableNumber }) {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const customerName = form.get("customerName");
    const customers = Number(form.get("customers"));
    const newTable = createTable({
      customerName,
      customers,
      tableNumber,
      status: TABLE_STATUS.open,
    });
    dispatch({
      type: tablesActions.openTable,
      payload: newTable,
    });

    setTable(tableNumber.toString(), newTable);
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

export default function TablePage() {
  const dispatch = useDispatch();
  const { tableNumber } = useParams();
  const table = useSelector((s) =>
    s.tables.find((t) => t.tableNumber === Number(tableNumber))
  );

  const addItemToCart = (item) =>
    dispatch({
      type: tablesActions.addItem,
      payload: {
        tableNumber: Number(tableNumber),
        item,
      },
    });

  const printReceipt = () => {
    setTable(tableNumber.toString(), {
      ...table,
      status: TABLE_STATUS.closing,
    });
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const editItemFromCart = (editedItem) => [];

  const selectItem = (item, isSelected) =>
    setSelectedItem(isSelected ? null : item);

  const activeItem = (item) => {
    if (!selectedItem) return false;
    return selectedItem.id === item.id;
  };

  const cancelEdit = () => setSelectedItem(null);

  const sendCart = () => {
    const editedTable = {
      ...table,
      starter: table.cartItems.some((item) => item.starter),
    };
    if (table.status === TABLE_STATUS.closing)
      editedTable.status = TABLE_STATUS.open;
    setTable(tableNumber, editedTable);
  };

  const main =
    table.status === TABLE_STATUS.close ? (
      <OpenTable tableNumber={Number(tableNumber)} />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {/* table actions + item working element */}
        <div className="md:col-span-2 flex flex-col gap-2">
          {/* table actions */}
          <div className="flex gap-2">
            <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-primary">
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
            />
          )}
          <div className={selectedItem ? "hidden" : "block"}>
            {/* table feed */}
            <Feed addItemToCart={addItemToCart} />
          </div>
        </div>
        {/* table cart */}
        <Cart
          cartItems={table.cartItems}
          activeItem={activeItem}
          setSelectedItem={selectItem}
          sendCart={sendCart}
        />
      </div>
    );

  return (
    <Layout>
      <TopPanel backHref={"/tables"} userName={"Ajmir Raziqi"}>
        <span>Table:{table.tableNumber}</span>
        <span>Customers:{table.customers}</span>
      </TopPanel>
      {main}
    </Layout>
  );
}
