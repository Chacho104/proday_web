// File for defining the logic for creating, updating, and deleting sub-task items
// These are server actions: ensures that the actions are not only executed server side,
// but also that the functions are callable from client components like forms

"use server";

import { redirect } from "next/navigation";

import { SubTaskFormSchema, SubTaskFormState } from "../lib/schema-definitions";
import { verifyUserSession } from "../lib/session";

// Server action for creating or updating a task depending on the httpMethod value passed in
export async function subTaskItemFormAction(
  httpMethod: string,
  subTaskId: string,
  subTaskItemId: string | null,
  state: SubTaskFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = SubTaskFormSchema.safeParse({
    title: formData.get("title"),
  });

  // If any form fields are invalid, return early
  // Helps avoid unnecessary calls to authentication provider's API
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title } = validatedFields.data;

  let redirectPath: string | null = null;

  // Get auth token from session
  // This is a server action, so we can use the session directly
  const authToken = await verifyUserSession();

  if (httpMethod === "POST") {
    const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${subTaskId}/items`;
    try {
      // Send POST request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title,
        }),
      });

      // Return from function if response is not okay and show error message to client
      if (!response.ok) {
        const errorMessage = await response.json();
        return { serverErrors: `${errorMessage.message}` };
      }

      // If response is okay, redirect user to all tasks page
      redirectPath = `/tasks`;
    } catch (error: any) {
      // Handle errors
      console.error("Error:", error);
    } finally {
      if (redirectPath) redirect(redirectPath);
    }
  }

  if (httpMethod === "PATCH" && subTaskItemId !== null) {
    const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${subTaskId}/items/${subTaskItemId}`;
    try {
      // Send PATCH request
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title,
        }),
      });

      // Return from function if response is not okay and show error message to client
      if (!response.ok) {
        const errorMessage = await response.json();
        return { serverErrors: `${errorMessage.message}` };
      }

      // If response is okay, redirect user to all tasks page
      redirectPath = `/tasks`;
    } catch (error: any) {
      // Handle errors
      console.error("Error:", error);
    } finally {
      if (redirectPath) redirect(redirectPath);
    }
  }
}

// Server Action for completing or uncompleting a task item
export async function toggleSubTaskItemCompletion(
  subTaskId: string,
  itemId: string,
  title: string,
  completed: boolean
) {
  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${subTaskId}/items/${itemId}`;

  // Get auth token from session
  // This is a server action, so we can use the session directly
  const authToken = await verifyUserSession();

  try {
    // Send PATCH request
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
        completed,
      }),
    });

    // Return from function if response is not okay and show error message to client
    if (!response.ok) {
      const { message } = await response.json();
      return message;
    }

    // If response is ok, extract and return success message
    const { message } = await response.json();
    return message;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
  }
}

// Server Action for deleting a task item
export async function deleteSubTaskItem(subTaskId: string, itemId: string) {
  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${subTaskId}/items/${itemId}`;

  // Get auth token from session
  // This is a server action, so we can use the session directly
  const authToken = await verifyUserSession();

  try {
    // Send DELETE request
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Return from function if response is not okay and show error message to client
    if (!response.ok) {
      const { message } = await response.json();
      return message;
    }

    // If response is ok, extract and return success message
    const { message } = await response.json();

    return message;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
  }
}
