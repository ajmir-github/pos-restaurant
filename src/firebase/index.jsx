import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "./config";
import {
  doc,
  setDoc,
  collection,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

const tableCollectionName = "Tables";
const orderCollectionName = "Orders";
const userCollectionName = "Users";
export const tablesRef = collection(database, tableCollectionName);
export const orderRef = collection(database, orderCollectionName);
export const userRef = collection(database, userCollectionName);

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
    querySnapshot
      .docChanges()
      .forEach((change) => onChange(normalizeFirebaseDoc(change.doc)));
  });

  return () => unsubscribe();
}

export async function addOrder(order) {
  await setDoc(doc(database, orderCollectionName, order._id), order);
  console.log("Order sent!");
}

export async function setOrder(order) {
  await setDoc(doc(database, orderCollectionName, order._id), order);
  console.log("Order is set!");
}

export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOut() {
  return auth.signOut();
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function getUserData(user) {
  const uid = user.uid;
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  return {
    uid,
    displayName,
    email,
    photoURL,
    emailVerified,
  };
}

export async function getUserByUID(uid) {
  const docRef = doc(database, userCollectionName, uid);
  const docSnap = await getDoc(docRef);
  return normalizeFirebaseDoc(docSnap);
}

export function updateUser(user) {
  return updateProfile(auth.currentUser, user);
}

export function updateUserEmail(email) {
  return updateEmail(auth.currentUser, email);
}

export function verifyUserEmail() {
  return sendEmailVerification(auth.currentUser);
}

export function updateUserPassword(newPassword) {
  return updatePassword(user, newPassword);
}

export function resetUserPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function removeUser() {
  return deleteUser(auth.currentUser);
}

export function trackAuth(onChange, onStart = () => {}) {
  const unsub = onAuthStateChanged(auth, async (user) => {
    if (!user) return onChange({ signed: false, user: null });
    onStart();
    const userData = getUserData(user);
    const restOfUserData = await getUserByUID(user.uid);
    onChange({
      signed: true,
      user: {
        ...userData,
        ...restOfUserData,
      },
    });
  });
  return unsub;
}
