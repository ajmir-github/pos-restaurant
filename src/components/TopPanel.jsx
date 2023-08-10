import { Link } from "react-router-dom";
import { ICON_ARROW_LEFT } from "../utils/icons";

export default function TopPanel({ replaceButtonWith, backHref, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      {replaceButtonWith || (
        <Link className="btn btn-info" to={backHref}>
          {ICON_ARROW_LEFT}
          Back
        </Link>
      )}
      <span className="flex gap-2 items-center">{children}</span>
    </div>
  );
}
