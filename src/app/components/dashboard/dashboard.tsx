// Dashboard component - renders all the information/components needed to create
// and manage user tasks

import Headline from "./components/headline/headline";
import UserMenu from "./components/user-menu/user-menu";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-between w-full py-4">
      <Headline />
      <UserMenu />
    </div>
  );
};

export default Dashboard;
