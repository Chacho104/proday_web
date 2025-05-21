// Logic for creating and managing user sessions

import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./type-definitions";

// We will need to encrypt the auth token before storing it in cookies, just for extra security

// Get and encode secret key to encrypt auth token
const secretKey = process.env.SESSION_SECRET;

const encodedKey = new TextEncoder().encode(secretKey);

// Create util function to encrypt auth token
// Important as this makes sure token from server cannot be used to send malicious
// yet valid requests to the server
export async function encryptAuthToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// Util function to decrypt auth token
export async function decryptAuthToken(userSession: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(userSession, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify user session!");
  }
}

// Use auth token received from the server to create a user session
// Can only be called from server components or server actions
export async function createUserSession(authToken: string) {
  // First encrypt auth token
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const userSession = await encryptAuthToken({ authToken, expiresAt });

  // Define cookie store by awaiting cookies
  const cookieStore = await cookies();

  // Store user session details (auth token) in the cookie
  cookieStore.set("userSession", userSession, {
    httpOnly: true,
    secure: false,
    sameSite: "lax", // Prevent cross-site usage - make strict in production
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds, which is same as token max age on the server
    path: "/",
  });
}

export const verifyUserSession = cache(async () => {
  // Get the cookies instance and retrieve the user session specific cookie
  const userSessionCookie = (await cookies()).get("userSession");

  // If user session specific cookie exists, get the value, decrypt it, and assign it to authToken and return authToken
  // Else redirect to login page
  if (userSessionCookie) {
    const sessionData = await decryptAuthToken(userSessionCookie.value);
    return sessionData?.authToken;
  } else {
    console.log("No user session found!");
    redirect("/login");
  }
});

// Util function to delete user session
// Basically, to be called when user logs out
// Caveat: can only be called from server components or server actions
export async function deleteUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("userSession");
}
