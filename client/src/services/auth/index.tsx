interface AuthProvider {
    isAuthenticated: boolean;
    user: null | string;
}

export const authProvider: AuthProvider = {
    isAuthenticated: false,
    user: "hello"
}