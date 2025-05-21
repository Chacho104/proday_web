// File for defining the logic for creating, updating, and deleting tasks
// These are server actions: ensures that the actions are not only executed server side,
// but also that the functions are callable from client components like forms

"use server";

import { redirect } from "next/navigation";

import { TaskFormState, TaskFormSchema } from "../lib/schema-definitions";
import { verifyUserSession } from "../lib/session";

// Server action for creating or updating a task depending on the httpMethod value passed in
export async function taskFormAction(
  httpMethod: string,
  taskId: string | null,
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

  // Get auth token from session
  // This is a server action, so we can use the session directly
  const authToken = await verifyUserSession();

  if (httpMethod === "POST") {
    const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks`;
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
      redirectPath = `/tasks`;
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
          Authorization: `Bearer ${authToken}`,
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
      redirectPath = `/tasks`;
    } catch (error: any) {
      // Handle errors
      console.error("Error:", error);
    } finally {
      if (redirectPath) redirect(redirectPath);
    }
  }
}

// Server Action for completing or uncompleting a task - updating task completion

export async function toggleTaskCompletion(
  taskId: string,
  title: string,
  type: string,
  urgency: string,
  importance: string,
  completed: boolean
) {
  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${taskId}`;

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
        type,
        urgency,
        importance,
        completed,
      }),
    });

    // Return from function if response is not okay and show error message to client
    if (!response.ok) {
      const { message } = await response.json();
      return message;
    }

    // If response is ok, return success message
    const { message } = await response.json();
    return message;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
  }
}

// Server action for deleting a task
export async function deleteTask(taskId: string) {
  const url = `${process.env.NEXT_PUBLIC_PRODAY_API_URL}/tasks/${taskId}`;

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

    // If response is ok, await success message and return it to client
    const { message } = await response.json();
    return message;
  } catch (error: any) {
    // Handle errors
    console.error("Error:", error);
  }
}
