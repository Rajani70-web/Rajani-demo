// import { createContext, useContext, useState } from "react";
// const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(
//         JSON.parse(localStorage.getItem("user")) || null
//     );
//     const login = (username, password) => {
//         if (username === "admin" && password === "12345") {
//             const userData = {
//                 username
//             };
//             localStorage.setItem("user", JSON.stringify(userData));
//             setUser(userData);
//             return true;
//         }
//         return false;
//     };
//     const logout = () => {
//         localStorage.removeItem("user");
//         setUser(null);
//     };
//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Check whether username is between 241 and 300
    const isValidUsername = (username) => {

        const usernamePattern =
            /^bwu\/bca\/24\/(24[1-9]|2[5-9][0-9]|300)$/;

        return usernamePattern.test(username);
    };


    // Login function
    const login = (username, password) => {

        // Remove accidental spaces
        username = username.trim();
        password = password.trim();

        // Check username format
        if (!isValidUsername(username)) {
            return {
                success: false,
                message:
                    "Invalid username. Use bwu/bca/24/241 to bwu/bca/24/300."
            };
        }


        // Password must be uppercase version of username
        const correctPassword = username.toUpperCase();


        // Check password
        if (password !== correctPassword) {
            return {
                success: false,
                message:
                    "Invalid password. Password must be the uppercase version of your username."
            };
        }


        // User is valid
        const userData = {
            username: username,
            password: password
        };


        // Save login information
        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );


        // Update React state
        setUser(userData);


        return {
            success: true,
            message: "Login successful"
        };
    };


    // Logout
    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


// Custom hook
export const useAuth = () => useContext(AuthContext);