import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
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

export { createEntry };