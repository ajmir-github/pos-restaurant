import { Link } from "react-router-dom";
import { ICON_ARROW_LEFT, ICON_USER } from "../utils/icons";

export default function TopPanel({ backHref, children, userName }) {
  return (
    <div className="flex items-center gap-4 text-lg">
      <Link className="btn btn-primary" to={backHref}>
        {ICON_ARROW_LEFT}
        Back
      </Link>
      <div className="grow flex items-center gap-4">
        <span className="grow flex gap-2 items-center">{children}</span>
        <span className="flex gap-2 items-center">
          {ICON_USER} {userName}
        </span>
      </div>
    </div>
  );
}
