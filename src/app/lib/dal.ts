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

  let redirectPath: string | null = null;

  try {
    // Send GET request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      redirectPath = "/login";
      return null;
    }
    const user = await response.json();

    return user.user;
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
});

// Get tasks for the user
export const getUserTasks = cache(async () => {
  const authToken = await verifyUserSession();

  if (!authToken) return null;

  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks`;

  try {
    // Send GET request to get tasks
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error: ${errorData}`);
      return null;
    }
    const tasks = await response.json();

    return tasks;
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  }
});

// Get task details for a specific task
export const getTaskDetails = cache(async (taskId: string) => {
  const authToken = await verifyUserSession();

  if (!authToken) return null;

  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${taskId}`;

  try {
    // Send GET request to get tasks
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error: ${errorData}`);
      return null;
    }
    const task = await response.json();

    return task.data;
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  }
});
