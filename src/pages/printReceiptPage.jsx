import { useEffect, useState } from "react";
import useTable from "../hooks/useTable";
import { EURO_SYMBOL, ITEM_GROUPS, classes } from "../utils";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function PrintReceiptPage() {
  const navigate = useNavigate();
  const { tableNumber, table, cartItems } = useTable();
  const total = cartItems.reduce(
    (art, item) => art + item.totalPrice * (item.qty || 1),
    0
  );
  useEffect(() => {
    window.print();
    navigate("/table/" + tableNumber);
  }, []);

  return (
    <div className="flex flex-col p-5">
      <div className="font-bold text-center">
        Oscar Restaurant
        <br />
        Protaras, Cyprus
        <br />
        Tel:95716722
      </div>
      <div className="font-bold">Table: {tableNumber}</div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>
                    {EURO_SYMBOL}
                    {item.totalPrice}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="font-bold">
        Total: {EURO_SYMBOL} {total}
      </div>
      <div className="">LEGAL DOCUMENT: {table._id}</div>
    </div>
  );
}
