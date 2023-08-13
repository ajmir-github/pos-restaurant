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

export const ITEM_COLOR = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  success: "btn-success",
  error: "btn-error",
  warning: "btn-warning",
  accent: "btn-accent",
  ghost: "btn-ghost",
  neutral: "btn-neutral",
};

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
  dessert: "Dessert",
};
export const ITEM_TYPES = ["Food", "Drink", "Dessert"];

export const MOD_COMPONENT = {
  checkbox: "checkbox",
  select: "select",
  numberInput: "numberInput",
  textInput: "textInput",
};

export const MOD_TYPE = {
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
    _id: "a",
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
    _id: "b",
    name: "Gin",
    type: ITEM_TYPE.drink,
    category: "Apperitives",
    color: "btn-secondary",
    price: 5,
    totalPrice: 5,
    qty: 1,

    mods: [
      {
        name: "Mixer",
        defaultValue: "Non",
        value: "Non",
        component: MOD_COMPONENT.select,
        options: [
          { value: "Non", type: MOD_TYPE.non },
          { value: "Tonic", type: MOD_TYPE.addToPrice, amount: 1 },
          { value: "Coke", type: MOD_TYPE.addToPrice, amount: 2 },
          { value: "Limonade", type: MOD_TYPE.addToPrice, amount: 2 },
          { value: "Coke Zero", type: MOD_TYPE.addToPrice, amount: 2 },
          { value: "Limonade Zero", type: MOD_TYPE.addToPrice, amount: 2 },
        ],
        type: MOD_TYPE.non,
        required: true,
      },
    ],
    message: "",
  },
  {
    _id: "c",
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
    _id: "d",

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
    _id: "e",

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
        type: MOD_TYPE.non,
      },
      {
        name: "Size",
        defaultValue: "Small",
        value: "Small",
        component: MOD_COMPONENT.select,
        options: [
          { value: "Small", type: MOD_TYPE.non },
          { value: "Large", type: MOD_TYPE.addToPrice, amount: 2 },
        ],
        type: MOD_TYPE.non,
        required: true,
      },
    ],
  },
  {
    _id: "f",

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
        type: MOD_TYPE.subtractFromPrice,
        amount: 1,
      },
    ],
    message: "",
  },
  {
    _id: "g",

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
    _id: "h",

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
    _id: "j",

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
    _id: "k",

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
    _id: "l",

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
    _id: "m",

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
        options: [
          { value: "Rare", type: MOD_TYPE.non },
          { value: "Medium-rare", type: MOD_TYPE.non },
          { value: "Medium", type: MOD_TYPE.non },
          { value: "Medium-well", type: MOD_TYPE.non },
          { value: "Well-done", type: MOD_TYPE.non },
        ],
        type: MOD_TYPE.non,
        required: true,
      },
    ],
    message: "",
  },
  {
    _id: "n",
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
        options: [
          { value: "Rare", type: MOD_TYPE.non },
          { value: "Medium-rare", type: MOD_TYPE.non },
          { value: "Medium", type: MOD_TYPE.non },
          { value: "Medium-well", type: MOD_TYPE.non },
          { value: "Well-done", type: MOD_TYPE.non },
        ],
        type: MOD_TYPE.non,
        required: true,
      },
    ],
    message: "",
  },
];

export const ITEM_GROUPS = [
  {
    _id: "CART_Starters",
    name: "Starters",
    filterFunc: (item) => item.type === ITEM_TYPE.food && item.starter,
  },
  {
    _id: "CART_Mains",
    name: "Mains",
    filterFunc: (item) => item.type === ITEM_TYPE.food && !item.starter,
  },
  {
    _id: "CART_Desserts",
    name: "Desserts",
    filterFunc: (item) => item.type === ITEM_TYPE.dessert,
  },
  {
    _id: "CART_Drinks",
    name: "Drinks",
    filterFunc: (item) => item.type === ITEM_TYPE.drink,
  },
];
