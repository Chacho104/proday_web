import { z } from "zod";

// Schema for validating user inputs for signing up and loggin in
// Confirms email and password are of the required format
export const AuthFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password muct contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});

// Type for the form state: useful for form submission action
export type AuthFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      authErrors?: string;
      message?: string;
    }
  | undefined;

// Schema for validating user inputs when creating a task
export const TaskFormSchema = z.object({
  title: z.string({ message: "Please enter a valid task title." }).trim(),
  type: z.string({ message: "Please enter a valid task type value." }).trim(),
  urgency: z
    .string({ message: "Please enter a valid task urgency value." })
    .trim(),
  importance: z
    .string({ message: "Please enter a valid task importance value." })
    .trim(),
  dueDate: z
    .string({ message: "Please enter a valid task deadline value" })
    .trim(),
});

// Type for the form state: useful for form submission action
export type TaskFormState =
  | {
      errors?: {
        title?: string[];
        type?: string[];
        urgency?: string[];
        importance?: string[];
        dueDate?: string[];
      };
      serverErrors?: string;
      message?: string;
    }
  | undefined;
