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
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { ICON_PEOPLE, ICON_TABLES } from "../utils/icons";

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
      <TopPanel backHref={"/"}>
        <span className="flex gap-2 items-center ">
          {ICON_TABLES}
          {stats.tables}
        </span>
        <span className="flex gap-2 items-center">
          {ICON_PEOPLE}
          {stats.customers}
        </span>
      </TopPanel>
      <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
        {tables.map((table) => {
          const [timePassed, setTimePassed] = useState("");
          const checkPassedTime = () => {
            if (!table.createdAt) return false;
            const minutes = dayjs(new Date()).diff(table.createdAt, "minute");
            if (minutes > 1) {
              setTimePassed(`${minutes} mins`);
            } else {
              setTimePassed("New");
            }
            return true;
          };
          useEffect(() => {
            checkPassedTime();
            const unsub = setInterval(() => {
              checkPassedTime() || clearInterval(unsub);
            }, 1000 * 60);
            return () => clearInterval(unsub);
          }, []);
          return (
            <Link
              to={`/table/${table.tableNumber}`}
              className={classes(
                "btn h-20 sm:h-24 w-20 sm:w-24 text-2xl md:w-28 md:h-28 sm:text-4xl relative",
                conditionalClasses(table.status, {
                  [TABLE_STATUS.close]: "btn-outline",
                  [TABLE_STATUS.open]: "btn-primary",
                  [TABLE_STATUS.closing]: "btn-warning",
                  [TABLE_STATUS.break]: "btn-accent",
                }),
                table.stats.hasStarters && " border-b-red-500 border-b-2",
                table.stats.hasMains && " border-t-red-500 border-t-2"
              )}
              key={table.tableNumber}
            >
              {table.tableNumber}
              <span className="text-xs  absolute top-2 left-2">
                {timePassed || ""}
              </span>
              <span className="text-xs  absolute bottom-2 right-2">
                {table.customers || ""}
              </span>
              {/* <span className="text-xs  absolute bottom-1 left-1 flex flex-col gap-1 text-base-100">
                {table.stats.hasStarters && (
                  <span className="badge bg-red-500 badge-xs p-0 w-2 h-2 md:w-3 md:h-3 border-gray-500"></span>
                )}
                {table.stats.hasMains && (
                  <span className="badge bg-orange-500 badge-xs p-0 w-2 h-2 md:w-3 md:h-3 border-gray-500"></span>
                )}
                {table.stats.hasDrinks && (
                  <span className="badge bg-green-500 badge-xs p-0 w-2 h-2 md:w-3 md:h-3 border-gray-500"></span>
                )}
                {table.stats.hasDesserts && (
                  <span className="badge bg-pink-500 badge-xs p-0 w-2 h-2 md:w-3 md:h-3 border-gray-500"></span>
                )}
              </span> */}
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}
