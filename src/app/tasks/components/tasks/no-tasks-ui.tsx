// A simple UI for when there are no tasks registered by the user

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import CreateTaskButton from "@/app/components/ui-elements/general/create-task-btn";
import Card from "@/app/components/ui-elements/general/card";

const NoTasksUI = () => {
  const router = useRouter();
  return (
    <Card className="flex flex-col justify-center items-center w-full rounded-md gap-y-4 md:gap-y-8 py-16 font-mono">
      <Image
        alt="Tasks Image"
        width={56}
        height={56}
        src="/images/tasks-image.png"
      />
      <h3 className="font-bold text-white text-base text-center">
        You don&apos;t have any tasks registered yet.
      </h3>
      <CreateTaskButton
        label="Create Task"
        onClick={() => router.push(`/tasks/new`)}
      />
    </Card>
  );
};

export default NoTasksUI;
