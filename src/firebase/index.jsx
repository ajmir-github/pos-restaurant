import { database } from "./config";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";

const tableCollectionName = "Tables";
const tablesRef = collection(database, tableCollectionName);

export const setTable = async (tableNumber, table) => {
  await setDoc(doc(database, tableCollectionName, tableNumber), table);
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

export function trackChanges(onChange) {
  const unsubscribe = onSnapshot(tablesRef, (querySnapshot) => {
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
