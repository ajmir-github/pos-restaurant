import { Link } from "react-router-dom";

export default function TopPanel({ backHref, children, userName }) {
  return (
    <div className="flex items-center font-mono text-sm sm:text-base gap-4">
      <Link className="btn btn-sm  btn-primary rounded-none" to={backHref}>
        Back
      </Link>
      <div className="grow flex items-center gap-4">
        <span className="grow flex gap-2 items-center">{children}</span>
        <span>{userName}</span>
      </div>
    </div>
  );
}
