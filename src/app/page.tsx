import { redirect } from "next/navigation";
import { verifyUserSession } from "./lib/session";

const LandingPage = async () => {
  // On landing on this page, await verification of user session
  // In no user session exists, redirect to login page
  // The redirect logic is implemented in the verifyUserSession function

  await verifyUserSession();

  // If a valid user session is found, redirect to tasks page
  redirect("/tasks");
};

export default LandingPage;
