import { database } from "./config";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";

const tableCollectionName = "Tables";
const orderCollectionName = "Orders";
export const tablesRef = collection(database, tableCollectionName);
export const orderRef = collection(database, orderCollectionName);

export const setTable = async (table) => {
  const tableId = table.tableNumber.toString();
  await setDoc(doc(database, tableCollectionName, tableId), table);
  console.log("Table is set!");
};

function normalizeFirebaseDoc(doc) {
  const id = doc.id;
  const data = doc.data();
  return {
    ...data,
    id,
  };
}

export const CHANGE_TYPES = {
  added: "added",
  modified: "modified",
  removed: "removed",
};

export function trackChanges(colRef, onChange) {
  const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
    // const tables = [];
    // querySnapshot.forEach((doc) => {
    //   tables.push(normalizeFirebaseDoc(doc));
    // });
    // onChange(tables);

    querySnapshot.docChanges().forEach((change) => {
      // if a doc added
      if (change.type === CHANGE_TYPES.added)
        return onChange(normalizeFirebaseDoc(change.doc));
      // if a doc updated
      if (change.type === CHANGE_TYPES.modified)
        return onChange(normalizeFirebaseDoc(change.doc));
      // if a doc removed
      if (change.type === CHANGE_TYPES.removed)
        return onChange(normalizeFirebaseDoc(change.doc));
    });
  });

  return () => unsubscribe();
}

export async function addOrder(order) {
  await setDoc(doc(database, orderCollectionName, order._id), order);
  console.log("Order sent!");
}
