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

export function createTable(entries) {
  return {
    // tableNumber,
    // customerName
    _id: generateID(),
    status: TABLE_STATUS.close,
    customers: 0,
    paymentMethod: PAYMENT_METHODS.cash,
    createdTime: null,
    cartItems: [],
    totalPrice: 0,
    stats: {},
    discount: {
      has: false,
      percentage: 0,
    },
    ...entries,
  };
}

export function getListOfTables(length = 20, withId = false) {
  return new Array(length)
    .fill(null)
    .map((a, index) => createTable({ tableNumber: index + 1 }));
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

export const MOD_COMPONENT = {
  checkbox: "checkbox",
  select: "select",
  numberInput: "numberInput",
  textInput: "textInput",
};

export const MODE_TYPE = {
  addToPrice: "ADD_TO_PRICE",
  subtractFromPrice: "SUBTRACT_FROM_PRICE",
  non: "NON",
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

export const ORDER_STATUS = {
  waiting: "WIATING",
  working: "WORKING",
  ready: "READY",
  pinned: "PINNED",
};

export const ITEMS = [
  {
    name: "Lava Cake",
    type: ITEM_TYPE.dessert,
    category: "Desserts",
    color: "btn-secondary",
    price: 7.5,
    totalPrice: 7.5,
    qty: 1,

    mods: [],
    message: "",
  },
  {
    name: "Cheese Cake",
    type: ITEM_TYPE.dessert,

    category: "Desserts",
    color: "btn-warning",
    price: 6.5,
    totalPrice: 6.5,
    qty: 1,

    mods: [],
    message: "",
  },
  {
    name: "Freshstrawberries",
    type: ITEM_TYPE.dessert,

    category: "Desserts",
    color: "btn-secondary",
    price: 5,
    totalPrice: 5,
    qty: 1,

    mods: [],
    message: "",
  },
  {
    name: "Cola",
    type: ITEM_TYPE.drink,

    category: "Soft Drinks",
    color: "btn-secondary",
    price: 2.5,
    totalPrice: 2.5,
    qty: 1,
    message: "",
    mods: [
      {
        name: "No ice",
        defaultValue: false,
        value: false,
        component: MOD_COMPONENT.checkbox,
        type: MODE_TYPE.non,
      },
      {
        name: "Size",
        defaultValue: "Small",
        value: "Small",
        component: MOD_COMPONENT.select,
        options: ["Small", "Large"],
        type: MODE_TYPE.non,
        required: true,
      },
    ],
  },
  {
    name: "Cola Zero",
    type: ITEM_TYPE.drink,
    category: "Soft Drinks",
    color: "btn-error",
    price: 2.5,
    totalPrice: 2.5,
    qty: 1,
    mods: [
      {
        name: "No ice",
        defaultValue: false,
        value: false,
        component: MOD_COMPONENT.checkbox,
        type: MODE_TYPE.subtractFromPrice,
        amount: 1,
      },
    ],
    message: "",
  },
  {
    name: "Speggitte Carbonara",
    type: ITEM_TYPE.food,
    category: "Pasta",
    color: "btn-error",
    price: 12.5,
    totalPrice: 12.5,
    qty: 1,
    mods: [],
    message: "",
  },
  {
    name: "Halumi",
    type: ITEM_TYPE.food,
    category: "Starters",
    starter: true,
    color: "btn-error",
    price: 12.5,
    totalPrice: 12.5,
    qty: 1,
    mods: [],
    message: "",
  },
  {
    name: "Garlic Bread",
    type: ITEM_TYPE.food,
    category: "Starters",
    starter: true,
    color: "btn-info",
    price: 6.5,
    totalPrice: 6.5,
    qty: 1,
    mods: [],
    message: "",
  },
  {
    name: "Cheese Garlic Bread",
    type: ITEM_TYPE.food,
    category: "Starters",
    starter: true,
    color: "btn-primary",
    price: 8.5,
    totalPrice: 8.5,
    qty: 1,
    mods: [],
    message: "",
  },
  {
    name: "Prawn Cooktail",
    type: ITEM_TYPE.food,
    category: "Starters",
    starter: true,
    color: "btn-warning",
    price: 10,
    totalPrice: 10,
    qty: 1,
    mods: [],
    message: "",
  },
  {
    name: "Steak Diana",
    type: ITEM_TYPE.food,
    category: "Steaks",
    color: "btn-secondary",
    price: 24.5,
    totalPrice: 24.5,
    qty: 1,
    mods: [
      {
        name: "Meat",
        defaultValue: "Medium",
        value: "Medium",
        component: MOD_COMPONENT.select,
        options: ["Rare", "Medium-rare", "Medium", "Medium-well", "Well-done"],
        type: MODE_TYPE.non,
        required: true,
      },
    ],
    message: "",
  },
  {
    name: "Pepper Diana",
    type: ITEM_TYPE.food,
    category: "Steaks",
    color: "btn-primary",
    price: 26.5,
    totalPrice: 26.5,
    qty: 1,
    mods: [
      {
        name: "Meat",
        defaultValue: "Medium",
        value: "Medium",
        component: MOD_COMPONENT.select,
        options: ["Rare", "Medium-rare", "Medium", "Medium-well", "Well-done"],
        type: MODE_TYPE.non,
        required: true,
      },
    ],
    message: "",
  },
];

export const ITEM_GROUPS = [
  {
    _id: "CART_GROUP_1",
    name: "Starters",
    filterFunc: (item) => item.type === ITEM_TYPE.food && item.starter,
  },
  {
    _id: "CART_GROUP_2",
    name: "Mains",
    filterFunc: (item) => item.type === ITEM_TYPE.food && !item.starter,
  },
  {
    _id: "CART_GROUP_3",
    name: "Desserts",
    filterFunc: (item) => item.type === ITEM_TYPE.dessert,
  },
  {
    _id: "CART_GROUP_4",
    name: "Drinks",
    filterFunc: (item) => item.type === ITEM_TYPE.drink,
  },
];

export class CachedArray {
  constructor(key) {
    this.key = key;
    if (localStorage.getItem(this.key) === null) this.set([]);
  }
  get() {
    return JSON.parse(localStorage.getItem(this.key));
  }
  set(value) {
    const newData = JSON.stringify(value);
    localStorage.setItem(this.key, newData);
  }
  clear() {
    localStorage.removeItem(this.key);
    this.set([]);
  }
}
