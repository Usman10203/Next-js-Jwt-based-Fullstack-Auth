"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function ResetPasswordPage({ params }: any) {
    const router = useRouter();
    const [user, setUser] = React.useState({
        password: "",
        confirm_password: ""

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onSubmit = async () => {
        alert(params.id)
        if (user.password !== user.confirm_password) {
            alert("Not Same!");
            return;
        }
        console.log('clicked')
        try {

            setLoading(true);
            console.log('user', user.password)
            const response = await axios.put(`/api/users/resetpassword`, {
                id: params.id,
                password: user.password
            });
            console.log("response", response.data);
            if (response.data.success) {
                alert('PASSWORD UPDATED')
            }

        } catch (error: any) {
            console.log("failed", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.password.length > 0 && user.confirm_password.length > 0) {
            setButtonDisabled(false);
        }
        else if (user.password !== user.confirm_password) {
            setButtonDisabled(false);

        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />

            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <label htmlFor="password">Confirm password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.confirm_password}
                onChange={(e) => setUser({ ...user, confirm_password: e.target.value })}
                placeholder="confirm password"
            />
            <button
                onClick={onSubmit}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Reset</button>
            {/* <Link href="/signup">Visit Signup page</Link>

            <Link className="mt-5" href="/checkemail">Forgot Password</Link> */}
        </div>
    )

}