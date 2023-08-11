import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../state";
import { useEffect } from "react";
import { getCurrentUser, signOut } from "../firebase";
import TopPanel from "../components/TopPanel";
import { EURO_SYMBOL } from "../utils";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const signOutUser = () => {
    signOut().then(() => {
      navigate("/login");
    });
  };

  const theme = useSelector((state) => state.theme);
  return (
    <Layout>
      <TopPanel
        replaceButtonWith={
          <div className="w-full flex">
            <div className="join">
              <button
                className="join-item btn btn-primary"
                onClick={() => dispatch({ type: themeActions.turnDarkTheme })}
              >
                Dark
              </button>
              <button
                className="join-item btn btn-secondary"
                onClick={() => dispatch({ type: themeActions.turnLightTheme })}
              >
                Light
              </button>
              <select
                className="join-item select select-bordered select-primary"
                value={theme}
                onChange={(e) =>
                  dispatch({
                    type: themeActions.chooseTheme,
                    payload: e.target.value,
                  })
                }
              >
                {THEMES.map((theme) => (
                  <option key={theme}>{theme}</option>
                ))}
              </select>
            </div>
          </div>
        }
      >
        {auth.signed && (auth.user.displayName || auth.user.email)}
      </TopPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-8">
        <div className="join join-vertical w-full gap-2">
          <Link
            className="join-item grow btn-outline  btn btn-lg w-full h-auto p-2 text-xl btn-primary"
            to={"/tables"}
          >
            Tables
          </Link>
          <Link
            className="join-item grow btn-outline  btn btn-lg w-full h-auto p-2 text-xl btn-secondary"
            to={"/kitchen"}
          >
            Kitchen
          </Link>
          <Link
            className="join-item grow btn-outline  btn btn-lg w-full h-auto p-2 text-xl btn-success"
            to={"/bar"}
          >
            Bar
          </Link>
          <Link
            className="join-item grow btn-outline  btn btn-lg w-full h-auto p-2 text-xl btn-error"
            to={"/admin"}
          >
            Admin
          </Link>
          <button
            onClick={signOutUser}
            className="join-item grow btn-outline  btn btn-lg w-full h-auto p-2 text-xl btn-accent"
          >
            Sign out
          </button>
        </div>
        <div className="w-full gap-4 flex flex-col">
          <div className="stats bg-gray-500 bg-opacity-10 stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-title">Tables</div>
              <div className="stat-value">21</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-title">Customers</div>
              <div className="stat-value">142</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
          <div className="stats bg-gray-500 bg-opacity-10 stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-title">Orders</div>
              <div className="stat-value">329</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-title">Items</div>
              <div className="stat-value">421</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
          <div className="stats  bg-gray-500 bg-opacity-10 stats-horizontal shadow w-full ">
            <div className="stat ">
              <div className="stat-title">Tips</div>
              <div className="stat-value">{EURO_SYMBOL}320</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat ">
              <div className="stat-title">Total</div>
              <div className="stat-value">{EURO_SYMBOL}1,221</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
