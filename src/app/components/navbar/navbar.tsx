import Logo from "./logo";

// A simple navigation component that renders the logo of the app
const Navbar = () => {
  return (
    <nav className="w-full h-[200px] bg-nav-bg">
      <Logo />
    </nav>
  );
};

export default Navbar;
