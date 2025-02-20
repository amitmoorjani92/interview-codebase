import { create } from 'zustand';

export const useAppStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),

    login: async (email:any, password:any) => {
        // Mock API call to simulate authentication
        if (email === "test@example.com" && password === "password123") {
        const fakeToken = "mocked-jwt-token";
        localStorage.setItem("token", fakeToken);
        set({ token: fakeToken, isAuthenticated: true });
        } else {
        throw new Error("Invalid credentials");
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ token: null, isAuthenticated: false });
    },
}));

export default useAppStore;