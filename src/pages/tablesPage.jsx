import { Link, useSearchParams } from "react-router-dom";
import TopPanel from "../components/TopPanel";
import {
  PAYMENT_METHODS,
  TABLE_STATUS,
  classes,
  conditionalClasses,
} from "../utils";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function TablesPage() {
  const tables = useSelector((s) => s.tables);
  const stats = useMemo(
    () => ({
      customers: tables.reduce((art, table) => art + table.customers, 0),
      tables: tables.reduce(
        (art, table) => (table.status !== TABLE_STATUS.close ? art + 1 : art),
        0
      ),
    }),
    [tables]
  );
  return (
    <Layout>
      <TopPanel backHref={"/"} userName={"Ajmir Raziqi"}>
        <span>Tables:{stats.tables}</span>
        <span>Customers:{stats.customers}</span>
      </TopPanel>
      <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
        {tables.map((table) => (
          <Link
            to={`/table/${table.tableNumber}`}
            className={classes(
              "btn h-20 sm:h-24 w-20 sm:w-24 text-2xl sm:text-4xl relative rounded-none",
              conditionalClasses(table.status, {
                [TABLE_STATUS.close]: "btn-ghost",
                [TABLE_STATUS.open]: "btn-primary",
                [TABLE_STATUS.closing]: "btn-warning",
                [TABLE_STATUS.break]: "btn-accent",
              }),
              table.starter && " border-b-error border-b-4"
            )}
            key={table.tableNumber}
          >
            {table.tableNumber}
            <span className="text-xs  absolute top-2 left-2">45 mins</span>
            <span className="text-xs  absolute bottom-2 right-2">
              {table.customers}
            </span>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
