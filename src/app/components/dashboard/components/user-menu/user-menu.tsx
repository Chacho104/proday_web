// Component to render the user menu components
// User menu consists Add Tasks button, notifications, and user avatar

import CreateTaskButton from "./components/create-task-btn";
import Notifications from "./components/notifications";
import UserAvatar from "./components/user-avatar";

const UserMenu = () => {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <CreateTaskButton />
      <Notifications />
      <UserAvatar />
    </div>
  );
};

export default UserMenu;
