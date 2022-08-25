import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { db } from "@/main";
import { doc, setDoc } from "firebase/firestore";

const signInWithGoogle = async () => {
    const auth = await getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(async (res) => {
        await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            avatar: res.user.photoURL,
            lastLogin: Date.now(),
        })
    })
}

const logout = async () => {
    const auth = await getAuth();
    await signOut(auth);
}

export { signInWithGoogle, logout }