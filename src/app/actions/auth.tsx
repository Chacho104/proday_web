// File for defining the logic for signing up, loging in, and logging out users
// These are server actions: ensures that the actions are not only executed server side,
// but also that the functions are callable from client components

"use server";

import { redirect } from "next/navigation";

import { AuthFormState, AuthFormSchema } from "../lib/schema-definitions";
import { createUserSession, deleteUserSession } from "../lib/session";

// Server action for signing up
// Called when user clicks Sign Up
export async function signup(state: AuthFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = AuthFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  // Helps avoid unnecessary calls to authentication provider's API
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // Call the provider or db to create a user...
  const { email, password } = validatedFields.data;

  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/signup`;

  let redirectPath: string | null = null;

  try {
    // Send POST request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Return from function if response is not okay and show error message to client
    if (!response.ok) {
      const errorMessage = await response.json();
      return { authError: `${errorMessage.message}` };
    }

    // Parse and handle success response: from the signup endpoint, we get a server generated token
    const { token } = await response.json();

    // Create a user session that utilizes the token sent back from the server
    await createUserSession(token);
    redirectPath = `/tasks`;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
    redirectPath = "/signup";
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

// Server action for logging in
// Called when user clicks Log In
export async function login(state: AuthFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = AuthFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  // Helps avoid unnecessary calls to authentication provider's API
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // Call the provider or db to create a user...
  const { email, password } = validatedFields.data;

  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/login`;

  let redirectPath: string | null = null;

  try {
    // Send POST request
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Return from function if response is not okay and show error message to client
    if (!response.ok) {
      const errorMessage = await response.json();
      return { authError: `${errorMessage.message}` };
    }

    // Parse and handle success response
    const { token } = await response.json();

    await createUserSession(token);

    redirectPath = `/tasks`;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
    redirectPath = "/login";
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

// Server action for logging out
// Called when user clicks Log Out
export async function logout() {
  deleteUserSession();
  redirect("/login");
}
