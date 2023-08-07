import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import Feed from "../components/Feed";
import EditItem from "../components/EditItem";
import Cart from "../components/Cart";
import { TABLE_STATUS } from "../utils";
import useTable from "../hooks/useTable";
import useItemSelector from "../hooks/useItemSelector";
import OpenTable from "../components/OpenTable";

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

  const tableActions = (
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
  );

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
            {tableActions}
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
