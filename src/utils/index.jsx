import ShortUniqueId from "short-unique-id";
// -------------- UTIL FUNCS
export function classes(...cls) {
  return cls.filter(Boolean).join(" ");
}

export function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}

export function generateID(length = 16) {
  //Instantiate
  const uid = new ShortUniqueId({ length });
  // return uid.seq(); on a seqence
  return uid();
}

export function conditionalClasses(condition, classes) {
  return classes[condition] || classes.default;
}
export function conditionalComponents(condition, Components) {
  return Components[condition] || Components.default;
}

const ADDITION_ENUMS = {
  and: ":&:",
  or: ":|:",
  true: "1",
  false: "0",
};
export function stringifyAdditions(additions) {
  return (additions || []).map(
    ({ name, type, defaultValue, value, options }) => {
      if (type === ADDITION_TYPE.select)
        return `${name}${ADDITION_ENUMS.and}${type}${
          ADDITION_ENUMS.and
        }${defaultValue}${ADDITION_ENUMS.and}${value || defaultValue}${
          ADDITION_ENUMS.and
        }${options.join(ADDITION_ENUMS.or)}`;

      if (type === ADDITION_TYPE.checkbox)
        return `${name}${ADDITION_ENUMS.and}${type}${ADDITION_ENUMS.and}${
          defaultValue ? ADDITION_ENUMS.true : ADDITION_ENUMS.false
        }${ADDITION_ENUMS.and}${
          value || defaultValue ? ADDITION_ENUMS.true : ADDITION_ENUMS.false
        }`;
      return `${name}:${type}:${defaultValue}:${value || defaultValue}`;
    }
  );
}

export function parseAdditions(additions) {
  return (additions || []).map((addition) => {
    const [name, type, defaultValue, value, options] = addition.split(
      ADDITION_ENUMS.and
    );
    if (type === ADDITION_TYPE.select)
      return {
        name,
        type,
        defaultValue,
        value,
        options: options.split(ADDITION_ENUMS.or),
      };

    if (type === ADDITION_TYPE.checkbox)
      return {
        name,
        type,
        defaultValue: defaultValue === ADDITION_ENUMS.true,
        value: value === ADDITION_ENUMS.true,
      };

    return {
      name,
      type,
      defaultValue,
      value,
    };
  });
}

// -------------- ENUMS
export const PAYMENT_METHODS = {
  card: "Card",
  cash: "Cash",
};
export const TABLE_STATUS = {
  close: "CLOSE",
  open: "OPEN",
  closing: "CLOSING",
  break: "BREAK",
};

export const EURO_SYMBOL = <>&#8364;</>;

export const ITEM_TYPE = {
  food: "Food",
  drink: "Drink",
  dessert: "dessert",
};

export const ADDITION_TYPE = {
  checkbox: "checkbox",
  select: "select",
  numberInput: "numberInput",
  textInput: "textInput",
};
export const ITEM_CATEGORIES = [
  { name: "Starters", color: "btn-primary" },
  { name: "Steaks", color: "btn-secondary" },
  { name: "Pasta", color: "btn-info" },
  { name: "Salads", color: "btn-warning" },
  { name: "Beverages", color: "btn-success" },
  { name: "Cooktails", color: "btn-primary" },
  { name: "Soft Drinks", color: "btn-info" },
  { name: "Beers", color: "btn-primary" },
  { name: "Apperitives", color: "btn-primary" },
  { name: "White Wines", color: "btn-secondary" },
  { name: "Rose Wine", color: "btn-primary" },
  { name: "Red Wine", color: "btn-neutral" },
  { name: "Kids", color: "btn-accent" },
  { name: "Desserts", color: "btn-ghost" },
];

export const ITEMS = [
  {
    name: "Lava Cake",
    type: ITEM_TYPE.dessert,
    category: "Desserts",
    color: "btn-secondary",
    price: 7.5,
  },
  {
    name: "Cheese Cake",
    type: ITEM_TYPE.dessert,

    category: "Desserts",
    color: "btn-warning",
    price: 6.5,
  },
  {
    name: "Freshstrawberries",
    type: ITEM_TYPE.dessert,

    category: "Desserts",
    color: "btn-secondary",
    price: 5,
  },
  {
    name: "Cola",
    type: ITEM_TYPE.drink,

    category: "Soft Drinks",
    color: "btn-secondary",
    price: 2.5,
    possibleAdditions: ["No ice", "Battle", "Zero", "Mixer"],
  },
  {
    name: "Cola Zero",
    type: ITEM_TYPE.drink,
    category: "Soft Drinks",
    color: "btn-error",
    price: 2.5,
  },
  {
    name: "Speggitte Carbonara",
    type: ITEM_TYPE.food,
    category: "Pasta",
    color: "btn-error",
    price: 12.5,
  },
  {
    name: "Halumi",
    type: ITEM_TYPE.food,
    category: "Starters",
    starter: true,
    color: "btn-error",
    price: 12.5,
  },
];

export const ITEM_GROUPS = [
  {
    id: "CART_GROUP_1",
    name: "Starters",
    filterFunc: (item) => item.type === ITEM_TYPE.food && item.starter,
  },
  {
    id: "CART_GROUP_2",
    name: "Mains",
    filterFunc: (item) => item.type === ITEM_TYPE.food && !item.starter,
  },
  {
    id: "CART_GROUP_3",
    name: "Desserts",
    filterFunc: (item) => item.type === ITEM_TYPE.dessert,
  },
  {
    id: "CART_GROUP_4",
    name: "Drinks",
    filterFunc: (item) => item.type === ITEM_TYPE.drink,
  },
];
