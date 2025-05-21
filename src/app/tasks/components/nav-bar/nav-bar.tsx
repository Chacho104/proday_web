// Navigation component that renders logo and user menu on every page

import Logo from "./components/today";
import UserMenu from "./components/user-menu/user-menu";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full py-4">
      <Logo />
      <UserMenu />
    </nav>
  );
};

export default Navbar;
