// This is the landing page of the web app
// Check for authenticated user: if user, render the dashboard, else redirect to log in page
import { getUser } from "./lib/dal";

import SideBar from "./components/side-bar/side-bar";
import Container from "./components/ui-elements/layout/container";
import Dashboard from "./components/dashboard/dashboard";

const LandingPage = async () => {
  const user = await getUser();
  return (
    <main className="h-full w-full">
      <Container className="flex items-start justify-start gap-x-6 h-full w-full">
        <SideBar />
        <Dashboard />
      </Container>
    </main>
  );
};

export default LandingPage;
