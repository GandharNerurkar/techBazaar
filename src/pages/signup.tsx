import React, { FormEvent } from 'react'
import CustomInput from '@/components/common/custom-input/CustomInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layoutv2 from '@/components/layout/Layoutv2';
import MotionReveal from '@/components/common/motion/MotionReveal';

const Signup = () => {

    const router = useRouter();

    const handleSignup = (e:FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                confirmPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(async data => {
                if (data.error) {
                    alert(data.message)
                }
                else {
                    console.log(data)
                    router.push("/login")
                }
            })
            .catch(err => alert(err))
    }

    return (
        <Layoutv2>
        <main className="flex min-h-[calc(100vh-120px)] items-center justify-center px-5 py-16" >
            <MotionReveal className="hero-surface w-full max-w-md p-1">
            <div className="w-full rounded-[26px] bg-white/85 px-5 py-8 dark:bg-slate-900/75 md:p-8" >
                <form onSubmit={handleSignup} >
                    <p className="pill-badge mb-4">Create Account</p>
                    <h1 className="mb-2 text-3xl font-bold" >Signup</h1>
                    <p className="mb-6 text-sm text-slate-500 dark:text-slate-300">Start shopping with a cleaner and more polished experience.</p>
                    <CustomInput
                        id='email'
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        name={"email"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                    />
                    <CustomInput
                        id='password'
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name={"password"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                    />
                    <CustomInput
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Enter your password"
                        name={"confirmPassword"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-300" >Already have account ? <Link href={"/login"} className="font-semibold text-blue-500" >login</Link></p>
                    <button className="primary-button mt-5 w-full" >Signup</button>
                </form>
            </div>
            </MotionReveal>
        </main>
        </Layoutv2>
    )
}

export default Signup
