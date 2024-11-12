"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";



const Checkmail = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const verifyEmail = async () => {
        try {
            setLoading(true);
            console.log('user', user)
            const response = await axios.post("/api/users/forgotpassword", user);
            console.log("Response", response.data);
            if (response.data.success == true) {
                alert('Verification Email Send to your email account')
            }

            // toast.success("Login success");
            // router.push("/profile");
        } catch (error: any) {
            console.log("Verification failed", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }



    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">

                <hr />

                <label htmlFor="email">email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />

                <button
                    onClick={verifyEmail}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Verify email</button>
                <Link href="/login">Visit Login page</Link>
            </div>
        </>
    )
}

export default Checkmail
