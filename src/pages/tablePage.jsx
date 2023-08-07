import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import Feed from "../components/Feed";
import EditItem from "../components/EditItem";
import Cart from "../components/Cart";
import { TABLE_STATUS } from "../utils";
import useTable from "../hooks/useTable";
import useItemSelector from "../hooks/useItemSelector";
import OpenTable from "../components/OpenTable";
import {
  ICON_EDIT,
  ICON_HASH,
  ICON_MORE,
  ICON_PAY,
  ICON_PEOPLE,
  ICON_PRINTER,
  ICON_TABLES,
} from "../utils/icons";

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
    saveCart,
    sendCart,
  } = useTable();

  const { selectedItem, selectItem, isSelectedItem, cancelEdit } =
    useItemSelector();

  return (
    <Layout>
      <TopPanel backHref={"/tables"} userName={"Ajmir Raziqi"}>
        <span className="flex gap-2 items-center ">
          {ICON_HASH}
          {tableNumber}
        </span>
        <span className="flex gap-2 items-center">
          {ICON_PEOPLE}
          {table.customers}
        </span>
      </TopPanel>
      {table.status === TABLE_STATUS.close ? (
        <OpenTable openTable={openTable} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {/* table actions + item working element */}

          <div className="md:col-span-2 flex flex-col gap-2">
            {/* table actions */}
            <div className="flex join">
              <div
                className="btn join-item grow  btn-primary"
                onClick={closeTable}
              >
                {ICON_PAY}
                Pay
              </div>

              <div
                className="btn join-item grow  btn-primary"
                onClick={printReceipt}
              >
                {ICON_PRINTER}
                Reciept
              </div>
              <div className="btn join-item grow  btn-primary">
                {ICON_EDIT}
                Edit
              </div>
              <div className="btn join-item grow  btn-primary">
                {ICON_MORE}
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
            saveCart={saveCart}
            sendCart={sendCart}
          />
        </div>
      )}
    </Layout>
  );
}
