// File for defining the logic for creating and updating tasks
// These are server actions: ensures that the actions are not only executed server side,
// but also that the functions are callable from client components like forms

"use server";

import { redirect } from "next/navigation";

import { TaskFormState, TaskFormSchema } from "../lib/schema-definitions";

// Server action for creating or updating a task depending on the httpMethod value passed in
export async function taskFormAction(
  httpMethod: string,
  taskId: string | null,
  userId: any,
  token: any,
  state: TaskFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = TaskFormSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    urgency: formData.get("urgency"),
    importance: formData.get("importance"),
    dueDate: formData.get("dueDate"),
  });

  // If any form fields are invalid, return early
  // Helps avoid unnecessary calls to API
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, type, urgency, importance, dueDate } = validatedFields.data;

  let validDueDate;

  if (dueDate === "Select Deadline") {
    validDueDate = undefined;
  } else {
    validDueDate = dueDate;
  }

  let redirectPath: string | null = null;

  if (httpMethod === "POST") {
    const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks`;
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
          type,
          urgency,
          importance,
          dueDate: validDueDate,
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

  if (httpMethod === "PATCH" && taskId !== null) {
    const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${taskId}`;
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
          type,
          urgency,
          importance,
          dueDate: validDueDate,
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

// Server Action for completing or uncompleting a task

export async function toggleTaskCompletion(
  token: string,
  taskId: string,
  title: string,
  type: string,
  urgency: string,
  importance: string,
  completed: boolean
) {
  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${taskId}`;

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
        type,
        urgency,
        importance,
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
