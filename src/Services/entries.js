import { db } from "@/main";
import { getAuth } from "firebase/auth";
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc, Timestamp } from "firebase/firestore";

const newEntry = async (_price, _filled, _paid) => {
    const auth = await getAuth();
    const userEntriesRef = await collection(db, "users/" + auth.currentUser.uid + "/entries");
    const docRef = await addDoc(userEntriesRef, {
        price: _price,
        filled: _filled,
        paid: _paid,
        date: Timestamp.now(),
    })
    const entrie = { id: docRef.id, price: _price, filled: _filled, paid: _paid, date: Timestamp.now().toDate().toLocaleDateString() }
    return entrie;
}

const getEntries = async () => {
    const auth = getAuth();
    const userEntriesRef = await collection(db, "users/" + auth.currentUser.uid + "/entries");
    const q = await query(userEntriesRef, orderBy("date", 'desc'));
    const querySnapshot = await getDocs(q);
    const dbEntries = [];
    querySnapshot.forEach((doc) => {
        dbEntries.push({
            id: doc.id,
            date: doc.data().date.toDate().toLocaleDateString(),
            price: doc.data().price,
            filled: doc.data().filled,
            paid: doc.data().paid
        })
    })

    return dbEntries;
}

const deleteEntrie = async (_id, _entries) => {
    const auth = getAuth();
    const userEntriesRef = await collection(db, "users/" + auth.currentUser.uid + "/entries");
    await deleteDoc(await doc(userEntriesRef, _id));

    const frontEntries = _entries;
    const filteredEntries = frontEntries.filter((entrie) => entrie.id !== _id);

    return filteredEntries;
}

export {newEntry, getEntries, deleteEntrie}