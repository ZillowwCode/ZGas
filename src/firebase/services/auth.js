import { auth } from "@/firebase/firebase";
import { useAuthStore } from "@/store/auth";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const googleSignIn = async () => {
    const authStore = useAuthStore();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
        .then((res) => {
            authStore.setUser(res.user);
        })
}

const globalSignOut = async () => {
    const authStore = useAuthStore();
    await signOut(auth);
    authStore.clearUser();
}

export { googleSignIn, globalSignOut }