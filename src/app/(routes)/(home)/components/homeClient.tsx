"use client";
import Button from "@/app/components/ui/button";
import CountBadge from "@/app/components/ui/countBadge";
import NoTasksUI from "@/app/components/ui/noTasksUI";
import TaskCard from "@/app/components/ui/taskCard";
import { useRouter } from "next/navigation";
import { GoPlusCircle } from "react-icons/go";

const HomeClient = () => {
  const router = useRouter();
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <Button className="-mt-6" onClick={() => router.push("/tasks/new")}>
        Create Task <GoPlusCircle size={16} />
      </Button>
      <div className="flex items-center justify-center gap-x-2 w-[90%] lg:w-[736px] mt-12">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <span className="text-light-blue font-bold text-sm">Tasks</span>
            <CountBadge count={0} />
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-lavender-blue font-bold text-sm">
              Completed
            </span>
            <CountBadge count={0} />
          </div>
        </div>
      </div>
      <NoTasksUI />
      <div className="mt-6 flex justify-center">
        <TaskCard />
      </div>
    </main>
  );
};

export default HomeClient;
