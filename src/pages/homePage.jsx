import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { themeActions } from "../state";

export default function HomePage() {
  const dispatch = useDispatch();
  return (
    <Layout>
      home page
      <Link className="btn btn-primary" to={"tables"}>
        Tables
      </Link>
      <button
        className="btn btn-secondary"
        onClick={() => dispatch({ type: themeActions.turnDarkTheme })}
      >
        Dark theme
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => dispatch({ type: themeActions.turnLightTheme })}
      >
        Light theme
      </button>
    </Layout>
  );
}
