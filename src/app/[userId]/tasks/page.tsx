// This is the home page for an authenticated user of the web app

import { TbClipboardSmile, TbClipboardText } from "react-icons/tb";

import { TaskData } from "@/app/lib/type-definitions";
import { getUserTasks, verifyUserSession } from "@/app/lib/dal";

import NoTasksUI from "./components/tasks/no-tasks-ui";
import TaskList from "./components/tasks/task-list";
import TasksSummary from "./components/tasks/tasks-summary";

const UserTasksPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const tasks: TaskData = await getUserTasks();
  const pendingTasks = tasks.total - tasks.completed;
  const { userId } = await params;
  const authToken = await verifyUserSession();
  return (
    <div>
      {tasks.tasks.length === 0 ? (
        <NoTasksUI userId={userId} />
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
          <TaskList tasks={tasks.tasks} userId={userId} token={authToken} />
        </>
      )}
    </div>
  );
};

export default UserTasksPage;
