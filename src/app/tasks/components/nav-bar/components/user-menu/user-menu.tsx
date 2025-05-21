// Component to render the user menu components
// User menu consists notifications and user avatar

import Notifications from "./components/notifications";
import UserAvatar from "./components/user-avatar";

const UserMenu = () => {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <Notifications />
      <UserAvatar />
    </div>
  );
};

export default UserMenu;
