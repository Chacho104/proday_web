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
export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
