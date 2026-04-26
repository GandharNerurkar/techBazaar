import React, { FormEvent, useState } from 'react'
import CustomInput from '@/components/common/custom-input/CustomInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layoutv2 from '@/components/layout/Layoutv2';
import { useUserContext } from '@/context/userContext';
import { useCartContext } from '@/context/cartContext';
import { useWishlistContext } from '@/context/wishlistContext';
import MotionReveal from '@/components/common/motion/MotionReveal';

const Login = () => {

    const router = useRouter()
    const {login} = useUserContext();
    const { getCartItems } = useCartContext();
    const { getWishlistItems } = useWishlistContext();
    const [error, setError] = useState("");

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        login(
            email, 
            password, 
            (user:any)=>{
                if(user.role === "ADMIN") 
                    router.push("/admin")
                else{
                    getCartItems()
                    getWishlistItems()
                    router.push("/")
                }
            },
            (error:any)=>{
                setError(error)
                console.log(error)
            }
        )
    }
    
    return (
        <Layoutv2>
        <main className="flex min-h-[calc(100vh-120px)] items-center justify-center px-5 py-16" >
            <MotionReveal className="hero-surface w-full max-w-md p-1">
            <div className="w-full rounded-[26px] bg-white/85 px-5 py-8 dark:bg-slate-900/75 md:p-8" >
                <form onSubmit={loginHandler} >
                    <p className="pill-badge mb-4">Welcome Back</p>
                    <h1 className="mb-2 text-3xl font-bold" >Login</h1>
                    <p className="mb-6 text-sm text-slate-500 dark:text-slate-300">Access your account with the upgraded storefront UI.</p>
                    <CustomInput
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        name={"email"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                        onChange={()=>setError("")}
                    />
                    <CustomInput
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name={"password"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                        onChange={()=>setError("")}
                    />
                    {
                        error && <p className="text-sm text-red-500" >{error}</p>
                    }
                    <p className="text-sm text-slate-500 dark:text-slate-300" >Dont have account ? <Link href={"/signup"} className="font-semibold text-blue-500" >signup</Link></p>
                    <button className="primary-button mt-5 w-full" >Login</button>
                </form>
            </div>
            </MotionReveal>
        </main>
        </Layoutv2>
    )
}

export default Login
