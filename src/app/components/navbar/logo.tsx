import Link from "next/link";
import { BsRocket } from "react-icons/bs";

// The logo component to be used inside the header
// Clicking the logo should navigate to the home page
const Logo = () => {
  return (
    <Link
      href="/"
      className="w-full h-full flex justify-center items-center gap-x-2"
    >
      <BsRocket size={30} className="text-light-blue" />
      <div className="font-black text-[40px] flex items-center gap-x-2">
        <h1 className="text-light-blue">Todo</h1>
        <h1 className="text-lavender-blue">App</h1>
      </div>
    </Link>
  );
};

export default Logo;
