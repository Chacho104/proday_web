// Simple component to show today's date, a welcome message, and a strategy if available

import Card from "@/app/components/ui-elements/general/card";

const Sidebar = () => {
  return (
    <Card className="h-full w-[30%] shadow-md hidden lg:block">
      <div>Calendar</div>
      <div>Guiding Quote Of The Day</div>
      <div>Reflections from the day...</div>
    </Card>
  );
};

export default Sidebar;
