import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge tailwind css classnames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to list the remaining hours of the day in a.m/p.m time format

export function listRemainingHours() {
  const now = new Date(); // Get the current date and time
  const currentHour = now.getHours(); // Get the current hour (24-hour format) and add one so that it shows next hour
  const hours = [];

  // Iterate through the remaining hours of the day
  for (let hour = currentHour; hour < 24; hour++) {
    const ampm = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
    hours.push({
      id: hour, // Use the 24-hour format hour as the ID
      value: `${formattedHour} ${ampm}`, // Formatted hour in AM/PM
    });
  }

  return hours;
}
