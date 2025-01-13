// This is the home page for an authenticated user of the web app

import { TbClipboardSmile, TbClipboardText } from "react-icons/tb";

import { TaskData } from "@/app/lib/type-definitions";
import { getUserTasks } from "@/app/lib/dal";

import NoTasksUI from "./components/no-tasks-ui";
import TaskList from "./components/task-list";
import TasksSummary from "./components/tasks-summary";

const HomePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const tasks: TaskData = await getUserTasks();
  const pendingTasks = tasks.total - tasks.completed;
  const { userId } = await params;
  return (
    <div>
      {tasks.tasks.length === 0 ? (
        <NoTasksUI />
      ) : (
        <>
          <div className="flex items-center justify-between gap-x-4 mb-6 w-full">
            <TasksSummary
              icon={TbClipboardSmile}
              label="Completed"
              count={tasks.completed}
            />
            <TasksSummary
              icon={TbClipboardText}
              label="Pending"
              count={pendingTasks}
            />
          </div>
          <TaskList tasks={tasks.tasks} userId={userId} />
        </>
      )}
    </div>
  );
};

export default HomePage;
