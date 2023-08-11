import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../state";
import { useEffect } from "react";
import { getCurrentUser, signOut } from "../firebase";
import TopPanel from "../components/TopPanel";
import { useAuth } from "../state/AuthState";

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
  const [auth, authDispatch] = useAuth();

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
          <button className="btn btn-info" onClick={signOutUser}>
            Sign out
          </button>
        }
      >
        {auth.signed && (auth.user.displayName || auth.user.email)}
      </TopPanel>

      <div className="flex flex-col gap-8 items-center">
        <div className="w-full flex justify-end">
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

        <div className="join join-vertical">
          <Link
            className="join-item grow btn-outline btn btn-lg btn-primary"
            to={"/tables"}
          >
            Tables
          </Link>
          <Link
            className="join-item grow btn-outline btn btn-lg btn-secondary"
            to={"/kitchen"}
          >
            Kitchen
          </Link>
          <Link
            className="join-item grow btn-outline btn btn-lg btn-success"
            to={"/bar"}
          >
            Bar
          </Link>
        </div>
      </div>
    </Layout>
  );
}
