// Simple component to show today's date, a welcome message, and a strategy if available
"use client";

import Card from "@/app/components/ui-elements/general/card";
import CreateTaskButton from "@/app/components/ui-elements/general/create-task-btn";

const Sidebar = () => {
  return (
    <Card className="h-full w-[30%] shadow-md hidden lg:block space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-white font-medium text-2xl">Inspiration</h1>
          <CreateTaskButton onClick={() => {}} />
        </div>
        <div className="bg-text-field-bg p-4 rounded-md mt-2">
          <p className="text-sm text-text-gray font-mono">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            alias consequatur accusantium saepe aut sit ea repellendus natus
            atque quia ullam, exercitationem laborum reiciendis praesentium
            distinctio impedit deserunt dignissimos! Quo.
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-white font-medium text-2xl">Reflections</h1>
          <CreateTaskButton onClick={() => {}} />
        </div>
        <div className="bg-text-field-bg p-4 rounded-md mt-2">
          <p className="text-sm text-text-gray font-mono">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            alias consequatur accusantium saepe aut sit ea repellendus natus
            atque quia ullam, exercitationem laborum reiciendis praesentium
            distinctio impedit deserunt dignissimos! Quo.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
