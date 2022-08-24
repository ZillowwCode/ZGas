import { auth, db } from "@/firebase/firebase";
import { useAuthStore } from "@/store/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const googleSignIn = async () => {
    const authStore = useAuthStore();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
        .then((res) => {
            authStore.setUser(res.user);
        })
        .catch((err) => {
            console.error(err);
        })

    // Add user to Firestore DB
    const usersCollectionRef = collection(db, "users/");
    const userDocRef = doc(usersCollectionRef, authStore.user.uid);
    await setDoc(userDocRef, {
        id: authStore.user.uid,
        signupDate: Date.now(),
        name: authStore.user.displayName,
        email: authStore.user.email,
        photoUrl: authStore.user.photoURL
    }, { merge: true });
}

const globalSignOut = async () => {
    const authStore = useAuthStore();
    await signOut(auth);
    authStore.clearUser();
}

export { googleSignIn, globalSignOut }