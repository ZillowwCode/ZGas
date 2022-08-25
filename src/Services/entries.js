import { db } from "@/main";
import { getAuth } from "firebase/auth";
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";

const newEntry = async (_price, _filled, _paid) => {
    const auth = await getAuth();
    const userEntriesRef = await collection(db, "users/" + auth.currentUser.uid + "/entries");
    await addDoc(userEntriesRef, {
        price: _price,
        filled: _filled,
        paid: _paid,
        date: Date.now()
    })
    const entrie = { price: _price, filled: _filled, paid: _paid, date: Date.now() }
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
            date: doc.data().date,
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
    console.log(userEntriesRef);
    await deleteDoc(await doc(userEntriesRef, _id));

    const frontEntries = _entries;
    const filteredEntries = frontEntries.filter((entrie) => entrie.id !== _id);

    return filteredEntries;
}

export {newEntry, getEntries, deleteEntrie}