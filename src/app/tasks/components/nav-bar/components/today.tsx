// Simple component to render today's date

import { getCurrentDate } from "@/app/lib/util";

const Today = () => {
  const date = getCurrentDate(); // Get the current date
  return (
    <div>
      <h1 className="text-white text-2xl font-semibold font-mono">{date}</h1>
    </div>
  );
};

export default Today;
