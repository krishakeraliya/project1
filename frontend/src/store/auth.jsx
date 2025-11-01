
// // import { useContext, useEffect, useState } from 'react';
// // import { createContext } from 'react'

// // export const AuthContext=createContext();

// // export const AuthProvider=({children})=>{
// //     const [token,setToken]=useState(localStorage.getItem("token"));
// //     const[user,setUser]=useState("")
// //     const[isLoading,setIsLoading]=useState(true)
// //     // const [services, setServices] = useState([]);
// //     const authorizationToken=`Bearer ${token}`
// //     const storetokenInLs=(serverToken)=>{
// //         localStorage.setItem(`token`,serverToken);   //localitem ma aa token save thai jai.....add mate setItem melva mate getItem aave...
// //          setToken(serverToken);
// //          userAuthentication(); // ✅ Fetch user data immediately after login

// //     }
// //     let isloggedin=!!token  //token value true to true false to false
// //     console.log(isloggedin)
// //     const  LogOutUser=()=>{
// //      setToken("");
// //      return localStorage.removeItem('token')
// //     }

// // const userAuthentication = async () => {
// //     try {
// //         setIsLoading(true);
// //         const currentToken = localStorage.getItem("token"); // Always get fresh token
// //         if(!currentToken) return setIsLoading(false);

// //         const response = await fetch("http://localhost:5000/api/auth/user", {
// //             method: "GET",
// //             headers: {
// //                 Authorization: `Bearer ${currentToken}`,
// //             }
// //         });

// //         if (response.ok) {
// //             const data = await response.json();
// //             console.log("user data", data.user); // backend response key should be 'user'
// //             setUser(data.user);
// //         } else {
// //             console.error("Error fetching user data");
// //             setUser(null);
// //         }
// //         setIsLoading(false);
// //     } catch (error) {
// //         console.error("Error fetching user data", error);
// //         setIsLoading(false);
// //         setUser(null);
// //     }
// // };



// //     useEffect(()=>{
         
// //         userAuthentication();
// //     },[])

// //     return(
// //         <AuthContext.Provider value={{isloggedin,storetokenInLs,LogOutUser,isLoading,user,authorizationToken,token }}>
// //             {children}
// //         </AuthContext.Provider>
// //     )
// // }




// // //jema use krvu che te..
// // export const useAuth=()=>{
// //     return useContext(AuthContext)
// // }

// import { useContext, useEffect, useState } from 'react';
// import { createContext } from 'react'

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem("token"));
//     const [user, setUser] = useState("");
//     const [isLoading, setIsLoading] = useState(true);
    
//     const authorizationToken = `Bearer ${token}`;
    
//     const storetokenInLs = (serverToken) => {
//         localStorage.setItem(`token`, serverToken);
//         setToken(serverToken);
//         userAuthentication(); // ✅ Fetch user data immediately after login
//     }
    
//     let isLoggedIn = !!token; // Fixed: consistent naming
//     console.log("isLoggedIn:", isLoggedIn);
    
//     const LogOutUser = () => {
//         setToken("");
//         setUser("");
//         return localStorage.removeItem('token');
//     }

//     const userAuthentication = async () => {
//         try {
//             setIsLoading(true);
//             const currentToken = localStorage.getItem("token");
//             if (!currentToken) {
//                 setIsLoading(false);
//                 return;
//             }

//             const response = await fetch("http://localhost:5000/api/auth/user", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${currentToken}`,
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log("user data", data.userData || data.user); // Handle both possible response formats
//                 setUser(data.userData || data.user); // Set user data correctly
//             } else {
//                 console.error("Error fetching user data - Status:", response.status);
//                 setUser(null);
//                 // If unauthorized, clear token
//                 if (response.status === 401) {
//                     localStorage.removeItem('token');
//                     setToken("");
//                 }
//             }
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Error fetching user data", error);
//             setIsLoading(false);
//             setUser(null);
//         }
//     };

//     useEffect(() => {
//         userAuthentication();
//     }, []);

//     return (
//         <AuthContext.Provider value={{ 
//             isLoggedIn, // Fixed: consistent naming
//             storetokenInLs, 
//             LogOutUser, 
//             isLoading, 
//             user, 
//             authorizationToken, 
//             token 
//         }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () => {
//     return useContext(AuthContext);
// }


import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const authorizationToken = `Bearer ${token}`;
    
    const storetokenInLs = (serverToken) => {
        localStorage.setItem(`token`, serverToken);
        setToken(serverToken);
        userAuthentication(); // ✅ Fetch user data immediately after login
    }
    
    let isLoggedIn = !!token; // Fixed: consistent naming
    console.log("isLoggedIn:", isLoggedIn);
    
    const LogOutUser = () => {
        setToken("");
        setUser("");
        return localStorage.removeItem('token');
    }

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const currentToken = localStorage.getItem("token");
            if (!currentToken) {
                setIsLoading(false);
                return;
            }

            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("user data", data.userData || data.user); // Handle both possible response formats
                setUser(data.userData || data.user); // Set user data correctly
            } else {
                console.error("Error fetching user data - Status:", response.status);
                setUser(null);
                // If unauthorized, clear token
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    setToken("");
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user data", error);
            setIsLoading(false);
            setUser(null);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, // Fixed: consistent naming
            storetokenInLs, 
            LogOutUser, 
            isLoading, 
            user, 
            authorizationToken, 
            token 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}