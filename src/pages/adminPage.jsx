import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import TopPanel from "../components/TopPanel";
import { useState } from "react";
import { classes } from "../utils";
import ProfileEditor from "../components/admin/ProfileEditor";
import CategoryEditor from "../components/admin/CategoryEditor";
import ItemEditor from "../components/admin/ItemEditor";

export default function AdminPage() {
  const TAB = {
    profileEditor: "Profile",
    CategoryEditor: "Category",
    itemEditor: "Item",
  };
  const [tab, setTab] = useState(TAB.profileEditor);
  const user = useSelector((state) => state.auth.user);
  const tabElement = (
    <div className="tabs tabs-boxed font-bold w-full">
      {Object.values(TAB).map((value, index) => (
        <button
          key={index}
          className={classes("tab", tab === value && "tab-active")}
          onClick={() => setTab(value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
  return (
    <Layout>
      <TopPanel>{user.displayName || user.email}</TopPanel>
      <div className="flex flex-col gap-4 items-center">
        {tabElement}
        {tab === TAB.profileEditor && <ProfileEditor />}
        {tab === TAB.CategoryEditor && <CategoryEditor />}
        {tab === TAB.itemEditor && <ItemEditor />}
      </div>
    </Layout>
  );
}
