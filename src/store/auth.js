import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'authStore',
    state: () => ({
        user: null
    }),
    getters: {
        getCurrentUser: (state) => {
            return state.user;
        }
    },
    actions: {
        setUser(_user) {
            this.user = _user;
        },
        clearUser() {
            this.user = null;
        }
    }
})