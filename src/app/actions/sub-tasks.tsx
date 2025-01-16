// File for defining the logic for creating and updating sub-tasks
// These are server actions: ensures that the actions are not only executed server side,
// but also that the functions are callable from client components like forms

"use server";

import { redirect } from "next/navigation";

import { SubTaskFormSchema, SubTaskFormState } from "../lib/schema-definitions";

// Server action for creating or updating a sub-task depending on the httpMethod value passed in
export async function subTaskFormAction(
  httpMethod: string,
  taskId: string,
  subTaskId: string | null,
  userId: string,
  token: string,
  state: SubTaskFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = SubTaskFormSchema.safeParse({
    title: formData.get("title"),
  });

  // If any form fields are invalid, return early
  // Helps avoid unnecessary calls to API
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title } = validatedFields.data;

  let redirectPath: string | null = null;

  if (httpMethod === "POST") {
    const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${taskId}/sub-tasks`;
    try {
      // Send POST request
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      redirectPath = `/${userId}/tasks`;
    } catch (error: any) {
      // Handle errors
      console.error("Error:", error);
    } finally {
      if (redirectPath) redirect(redirectPath);
    }
  }

  if (httpMethod === "PATCH" && subTaskId !== null) {
    const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${taskId}/sub-tasks/${subTaskId}`;
    try {
      // Send PATCH request
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      redirectPath = `/${userId}/tasks`;
    } catch (error: any) {
      // Handle errors
      console.error("Error:", error);
    } finally {
      if (redirectPath) redirect(redirectPath);
    }
  }
}

// Server Action for completing or uncompleting a sub-task
export async function toggleSubTaskCompletion(
  token: string,
  taskId: string,
  subTaskId: string,
  title: string,
  completed: boolean
) {
  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${taskId}/sub-tasks/${subTaskId}`;

  try {
    // Send PATCH request
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        completed,
      }),
    });

    // Return from function if response is not okay and show error message to client
    if (!response.ok) {
      const errorMessage = await response.json();
      console.log(errorMessage);
      return null;
    }

    // If response is ok, return success message
    const { message } = await response.json();

    return message;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
  }
}
