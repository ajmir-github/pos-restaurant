import { classes, ITEMS, ITEM_CATEGORIES } from "../utils";
import { useState } from "react";

export default function Feed({ addItemToCart }) {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");

  const searchMode = !!search;
  const filterFunc = (item) => {
    if (search) {
      const pattern = new RegExp(search, "ig");
      return pattern.test(item.name);
    }
    return item.category === category;
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search Here"
        className="input input-bordered rounded-none w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2 flex-wrap">
        {searchMode ? (
          <button
            className="btn rounded-none btn-sm md:btn-md btn-secondary btn-outline"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        ) : (
          <button
            className="btn rounded-none btn-sm md:btn-md btn-secondary btn-outline"
            disabled={category === null}
            onClick={() => setCategory(null)}
          >
            Back
          </button>
        )}
        {category || searchMode
          ? ITEMS.filter(filterFunc).map((item, index) => (
              <button
                onClick={() => addItemToCart(item)}
                className={classes(
                  "btn rounded-none btn-sm md:btn-md",
                  item.color
                )}
                key={item.name + index}
              >
                {item.name}
              </button>
            ))
          : ITEM_CATEGORIES.map((category, index) => (
              <button
                onClick={() => setCategory(category.name)}
                className={classes(
                  "btn rounded-none btn-sm md:btn-md",
                  category.color
                )}
                key={category.name + index}
              >
                {category.name}
              </button>
            ))}
      </div>
    </div>
  );
}
