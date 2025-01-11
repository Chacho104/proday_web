// Simple component to show today's date, a welcome message, and a strategy if available
const SideBar = () => {
  return (
    <div className="bg-cards-background h-full rounded-md max-w-[25%] shadow-lg p-4 hidden lg:block">
      <div>Calendar</div>
      <div>Suggested strategy to achieve daily goal</div>
    </div>
  );
};

export default SideBar;
