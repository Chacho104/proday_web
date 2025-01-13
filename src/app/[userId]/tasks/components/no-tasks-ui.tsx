import Image from "next/image";
import Card from "../../../components/ui-elements/general/card";
import CreateTaskButton from "@/app/components/ui-elements/general/create-task-btn";

// A simple UI for when there are no tasks registered by the user
const NoTasksUI = () => {
  return (
    <Card className="flex flex-col justify-center items-center w-full rounded-md gap-y-4 py-16">
      <Image
        alt="Tasks Image"
        width={56}
        height={56}
        src="/images/tasks-image.png"
      />
      <h3 className="font-bold text-white text-base text-center">
        You don't have any tasks registered yet.
      </h3>
      <CreateTaskButton label="Create Task" />
    </Card>
  );
};

export default NoTasksUI;
