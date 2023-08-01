import { Link, useParams } from "react-router-dom";

export default function TablePage() {
  const { tableNumber } = useParams();
  console.log({ tableNumber });
  return (
    <div>
      TablePage
      <Link className="btn btn-primary" to={"/tables"}>
        Tables
      </Link>
    </div>
  );
}
