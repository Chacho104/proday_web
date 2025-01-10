// Logic for user CRUD actions - Server Actions

"use server";

import { FormState, SignupFormSchema } from "../lib/schema-definitions";
import { redirect } from "next/navigation";
import { createUserSession, deleteUserSession } from "../lib/session";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
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

    // Parse and handle success response: from the signup endpoint, we get a userId and a server generated token
    const { token } = await response.json();

    // Create a user session that utilizes the token sent back from the server
    await createUserSession(token);
    redirectPath = "/";
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
    redirectPath = "/signup";
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
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

    // Parse and handle success response
    const { token } = await response.json();

    await createUserSession(token);

    redirectPath = "/";
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
    redirectPath = "/login";
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

export async function logout() {
  deleteUserSession();
  redirect("/login");
}
