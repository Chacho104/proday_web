// Server action for getting details of a logged in user

"use server";

import { cache } from "react";
import { verifyUserSession } from "../lib/session";

export const getUserDetails = cache(async () => {
  const authToken = await verifyUserSession();

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

    if (!response.ok) {
      const { message } = await response.json();
      return message;
    }

    const user = await response.json();
    return user.user;
  } catch (error: any) {
    console.error("Error:", error);
    return null;
  }
});
