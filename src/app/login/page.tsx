// The login page
// Consider start page of application for returning unauthenticated users
// Has a redirect to signup page for new unauthenticated users

"use client";

import { useActionState } from "react";
import Link from "next/link";

import Container from "../components/ui-elements/layout/container";
import AuthHeadline from "../components/ui-elements/general/auth-headline";
import { login } from "../actions/auth";

const Login = () => {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <Container className="w-full h-full flex items-center justify-center">
      <form
        action={action}
        className="w-full max-w-96 space-y-4 md:space-y-6 bg-cards-background shadow-xl p-6 rounded-md font-mono"
      >
        <AuthHeadline message="Log in to handle your daily tasks like a pro." />
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-white text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="p-2 rounded-md focus:outline-none bg-text-field-bg"
          />
        </div>
        {state?.errors?.email && (
          <p className="text-red-500 text-xs">{state.errors.email}</p>
        )}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password" className="text-white text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="p-2 rounded-md focus:outline-none bg-text-field-bg"
          />
        </div>
        {state?.errors?.password && (
          <div className="text-red-500 text-xs">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          disabled={pending}
          type="submit"
          className="border-1 bg-warm-yellow py-2 px-4 rounded-md"
        >
          {pending ? "Logging In..." : "Log In"}
        </button>
        {state?.authError && (
          <p className="text-red-500 text-sm">{state.authError}</p>
        )}
        <div className="flex items-center gap-x-1 text-sm text-white">
          <p>Don't have an account?</p>
          <Link
            href={"/signup"}
            className="hover:text-warm-yellow hover:underline hover:underline-offset-2 transition"
          >
            Sign up here
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
