"use client";
import Button from "@/app/components/ui/button";
import CountBadge from "@/app/components/ui/countBadge";
import NoTasksUI from "@/app/components/ui/noTasksUI";
import TaskCard from "@/app/components/ui/taskCard";
import { TaskData } from "@/models/task";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoPlusCircle } from "react-icons/go";

interface HomeClientProps {
  tasksData: TaskData;
  page: number;
  pageSize: number;
}

const HomeClient: React.FC<HomeClientProps> = ({
  tasksData,
  page,
  pageSize,
}) => {
  const router = useRouter();
  const pageNumber = typeof page === "string" ? Number(page) : 1;
  const pageSizeNumber = typeof pageSize === "string" ? Number(pageSize) : 5;
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <Button className="-mt-6" onClick={() => router.push("/tasks/new")}>
        Create Task <GoPlusCircle size={16} />
      </Button>
      <div className="flex items-center justify-center gap-x-2 w-[90%] lg:w-[736px] mt-12">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <span className="text-light-blue font-bold text-sm">Tasks</span>
            <CountBadge count={tasksData.total} />
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-lavender-blue font-bold text-sm">
              Completed
            </span>
            <CountBadge count={tasksData.completed} />
          </div>
        </div>
      </div>
      {/* If no tasks found, render NoTaskUI component */}
      {tasksData.total === 0 && <NoTasksUI />}
      <div className="mt-6 flex justify-center">
        <TaskCard tasks={tasksData.tasks} />
      </div>
      {tasksData.total > 5 && (
        <div className="mt-8 space-x-6">
          <Link
            href={{
              query: {
                page: pageNumber > 1 ? pageNumber - 1 : 1,
              },
            }}
            className={`py-2 px-3 bg-transparent border border-white rounded-lg text-white hover:shadow-xl hover:border-text-gray hover:text-text-gray ${
              pageNumber <= 1 && "pointer-events-none opacity-50"
            }`}
          >
            Previous
          </Link>
          <Link
            href={{
              query: {
                page: pageNumber + 1,
              },
            }}
            className={`py-2 px-3 bg-transparent border border-white rounded-lg text-white hover:shadow-xl hover:border-text-gray hover:text-text-gray ${
              tasksData.tasks.length / pageSizeNumber < 1 &&
              "pointer-events-none opacity-50"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </main>
  );
};

export default HomeClient;
