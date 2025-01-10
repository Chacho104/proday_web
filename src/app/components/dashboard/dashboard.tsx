// Dashboard component - renders all the information/components needed to create
// and manage user tasks

import Logo from "./components/logo";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-between">
      <Logo />
      <div>User menu</div>
    </div>
  );
};

export default Dashboard;
