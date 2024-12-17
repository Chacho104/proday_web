import Button from "../components/ui/button";
import { GoPlusCircle } from "react-icons/go";
import CountBadge from "../components/ui/countBadge";
import NoTasksUI from "../components/ui/noTasksUI";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <Button className="-mt-6">
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
    </main>
  );
}
