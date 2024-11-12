"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// export default function VerifyEmailPage() {

//     const [token, setToken] = useState("");
//     const [verified, setVerified] = useState(false);
//     const [error, setError] = useState(false);

//     const verifyUserEmail = async () => {
//         try {
//             await axios.post('/api/users/verifyemail', { token })
//             setVerified(true);
//         } catch (error: any) {
//             setError(true);
//             console.log(error.reponse.data);

//         }

//     }

//     useEffect(() => {
//         const urlToken = window.location.search.split("=")[1];
//         setToken(urlToken || "");
//     }, []);


//     useEffect(() => {
//         if (token.length > 0) {
//             verifyUserEmail();
//         }
//     }, [token]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">

//             <h1 className="text-4xl">Verify Email</h1>
//             <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

//             {verified && (
//                 <div>
//                     <h2 className="text-2xl">Email Verified</h2>
//                     <Link href="/login">
//                         Login
//                     </Link>
//                 </div>
//             )}
//             {error && (

//                 <div>
//                     <h2 className="text-2xl bg-red-500 text-black">Error</h2>
//                 </div>
//             )}

//         </div>
//     )

// }

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [user, setUser] = useState();
    const router = useRouter();

    const verifyUserEmail = async () => {
        console.log('inside verify Email')
        try {
            const endpoint = isPasswordReset ? '/api/users/verifyforgot' : '/api/users/verifyemail';
            console.log('endpoint', endpoint)
            const response = await axios.post(endpoint, { token });
            console.log('response', response)
            setUser(response?.data?.data?.id)
            console.log('user id frontend', user)
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const urlToken = window.location.search.split("=")[1];
        // console.log('url token', urlToken)
        // const type = urlParams.get('type');
        // console.log(type)
        // setToken(urlToken || "");
        // setIsPasswordReset(true);
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        const type = urlParams.get('type');
        console.log('url token', urlToken);
        console.log(type);
        setToken(urlToken || "");
        setIsPasswordReset(type === 'reset');
    }, []);

    useEffect(() => {
        console.log('token 2', token)
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    useEffect(() => {
        if (verified && isPasswordReset && user) {
            alert(`/resetpassword/${user}`)
            router.push(`/resetpassword/${user}`);
        }
    }, [verified, isPasswordReset, router, user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">{isPasswordReset ? "Reset Password" : "Verify Email"}</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            {verified && !isPasswordReset && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    );
}