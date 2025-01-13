// This component defines the general layout for all the pages the user will see once authenticated

import { getUser } from "../lib/dal";

import Container from "../components/ui-elements/layout/container";
import Navbar from "./components/nav-bar/nav-bar";
import Sidebar from "./components/side-bar/side-bar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <main className="w-full h-full">
      <Container className="flex items-start justify-start gap-x-6 h-full w-full">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          {children}
        </div>
      </Container>
    </main>
  );
};

export default DashboardLayout;
