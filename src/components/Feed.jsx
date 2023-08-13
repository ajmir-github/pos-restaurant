import { classes } from "../utils";
import { useState } from "react";
import { ICON_ARROW_LEFT, ICON_X_MARK } from "../utils/icons";
import { useSelector } from "react-redux";

export default function Feed({ addItemToCart }) {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const items = useSelector((state) => state.items);
  const categories = useSelector((state) => state.categories);

  const searchMode = !!search;
  const filterFunc = (item) => {
    if (search) {
      const pattern = new RegExp(search, "ig");
      return pattern.test(item.name);
    }
    return item.category === category;
  };

  return (
    <div className="flex flex-col gap-2 grow">
      <input
        type="text"
        placeholder="Search Here"
        className="input input-bordered  w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2 flex-wrap">
        {searchMode ? (
          <button
            className="btn btn-secondary btn-outline"
            onClick={() => setSearch("")}
          >
            {ICON_X_MARK}
            Clear
          </button>
        ) : (
          <button
            className="btn btn-secondary btn-outline"
            disabled={category === null}
            onClick={() => setCategory(null)}
          >
            {ICON_ARROW_LEFT}
            Back
          </button>
        )}
        {category || searchMode
          ? items.filter(filterFunc).map((item, index) => (
              <button
                onClick={() => addItemToCart(item)}
                className={classes("btn", item.color)}
                key={item.name + index}
              >
                {item.name}
              </button>
            ))
          : categories.map((category, index) => (
              <button
                onClick={() => setCategory(category.name)}
                className={classes("btn", category.color)}
                key={category.name + index}
              >
                {category.name}
              </button>
            ))}
      </div>
    </div>
  );
}
