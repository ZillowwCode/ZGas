import { db } from "@/firebase/firebase";
import { collection, addDoc, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useAuthStore } from "@/store/auth";

const createEntry = async (_price, _filled, _paid) => {
    const authStore = useAuthStore();
    const userEntriesCollectionRef = collection(db, "users/" + authStore.user.uid + "/entries");
    await addDoc(userEntriesCollectionRef, {
        date: Date.now(),
        price: _price,
        filled: _filled,
        paid: _paid
    });
}

const getEntries = async (_uid) => {
    const userEntriesCollectionRef = collection(db, "users/" + _uid + "/entries");
    const query = await getDocs(userEntriesCollectionRef, orderBy("date", "desc"));
    const userEntries = [];
    query.forEach((doc) => {
        userEntries.push(doc.data());
    });
    return userEntries;
}

const deleteEntry = async (_id, _uid) => {
    console.log("UID", _uid)
    const userEntriesCollectionRef = await collection(db, "users/" + _uid + "/entries");
    const docRef = await doc(userEntriesCollectionRef);
    await deleteDoc(docRef);
}

export { createEntry, getEntries, deleteEntry };