import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { themeActions } from "../state";

export default function HomePage() {
  const dispatch = useDispatch();
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
    </Layout>
  );
}
