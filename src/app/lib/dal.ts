// A Data Access Layer that verifies user's authentication status as they interact with the app
// Must be done on the server only

import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptAuthToken } from "./session";

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

// Now we can try get a user from our API using the retrieved token from verifyUserSession

export const getUser = cache(async () => {
  const authToken = await verifyUserSession();

  if (!authToken) return null;

  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/user`;

  try {
    // Send GET request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const user = await response.json();

    return user;
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  }
});
