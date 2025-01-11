// A reusable component that renders an icon with a badge

import { IconType } from "react-icons";

// Accepts two props: an icon and a count of notification items
interface BadgedIconProps {
  icon: IconType;
  count: number;
}

const BadgedIcon: React.FC<BadgedIconProps> = ({ icon: Icon, count }) => {
  return (
    <div className="flex items-center cursor-pointer hover:scale-110">
      <Icon size={34} className="text-white" />
      <div className="bg-warm-yellow h-5 w-5 rounded-full flex items-center justify-center -ml-3 -mt-5 text-white">
        <span className="text-[10px]">{count}</span>
      </div>
    </div>
  );
};

export default BadgedIcon;
