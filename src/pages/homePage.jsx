import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      home page
      <Link className="btn btn-primary" to={"tables"}>
        Tables
      </Link>
    </div>
  );
}
