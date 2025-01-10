interface CountBadgeProps {
  count: number;
}

// A small component to render the count of all tasks and completed tasks
const CountBadge: React.FC<CountBadgeProps> = ({ count }) => {
  return (
    <div className="bg-badge-gray h-5 w-6 rounded-full flex items-center justify-center">
      <span className="text-sm text-white font-bold">{count}</span>
    </div>
  );
};

export default CountBadge;
