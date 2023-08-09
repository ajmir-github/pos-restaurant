import { useEffect, useState } from "react";
import useTable from "../hooks/useTable";
import { EURO_SYMBOL, ITEM_GROUPS, classes } from "../utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
export default function PrintReceiptPage() {
  const navigate = useNavigate();
  const { tableNumber, table, cartItems } = useTable();
  const total = cartItems.reduce(
    (art, item) => art + item.totalPrice * (item.qty || 1),
    0
  );
  useEffect(() => {
    window.print();
  }, []);
  return (
    <div
      className="flex flex-col p-5 bg-white text-black w-full min-h-screen"
      onDoubleClick={() => navigate("/table/" + tableNumber)}
    >
      <div className="font-bold text-center" print="yes">
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
              <th className="text-black ">item</th>
              <th className="text-black ">Qty</th>
              <th className="text-black ">Price</th>
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
      <div className="">
        Scan the barcode to receive the check online: {table._id}
      </div>
      <div className=" p-5 bg-white">
        <QRCode value="https://www.afghancodecamp.tk/" size={256} />
      </div>
    </div>
  );
}
