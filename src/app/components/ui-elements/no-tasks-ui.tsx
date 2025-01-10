import Image from "next/image";

// A simple UI for when there are no tasks registered by the user
const NoTasksUI = () => {
  return (
    <div className="flex flex-col justify-center items-center border-t-[1px] border-badge-gray rounded-lg w-[90%] lg:w-[736px] mt-6 gap-y-4 pt-16">
      <Image
        alt="Tasks Image"
        width={56}
        height={56}
        src="/images/tasks-image.png"
      />
      <h3 className="font-bold text-text-gray text-base text-center">
        You don't have any tasks registered yet.
      </h3>
      <span className="font-normal text-base text-center text-text-gray">
        Create tasks and organize your to-do items.
      </span>
    </div>
  );
};

export default NoTasksUI;
