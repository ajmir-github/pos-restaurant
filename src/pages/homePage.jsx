import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../state";

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
  const theme = useSelector((state) => state.theme);
  return (
    <Layout>
      home page
      <Link className="btn btn-primary" to={"/tables"}>
        Tables
      </Link>
      <Link className="btn btn-secondary" to={"/kitchen"}>
        Kitchen
      </Link>
      <Link className="btn btn-success" to={"/bar"}>
        Bar
      </Link>
      <button
        className="btn btn-ghost"
        onClick={() => dispatch({ type: themeActions.turnDarkTheme })}
      >
        Dark theme
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => dispatch({ type: themeActions.turnLightTheme })}
      >
        Light theme
      </button>
      <select
        className="select select-bordered w-full"
        value={theme}
        onChange={(e) =>
          dispatch({ type: themeActions.chooseTheme, payload: e.target.value })
        }
      >
        {THEMES.map((theme) => (
          <option>{theme}</option>
        ))}
      </select>
    </Layout>
  );
}
