// Form for creating or updating sub-tasks

"use client";

import Card from "@/app/components/ui-elements/general/card";
import { SubTask } from "@/app/lib/type-definitions";

interface SubTaskFormProps {
  initialData?: SubTask | null;
  taskId: string;
}

const SubTaskForm = ({ initialData, taskId }: SubTaskFormProps) => {
  return (
    <Card>
      {initialData ? (
        <h2 className="text-white text-lg py-2">
          Update the selected sub-task below
        </h2>
      ) : (
        <h2 className="text-white text-lg py-2">Create a sub-task below</h2>
      )}
      <form action="" className="w-full space-y-4 md:space-y-6">
        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="title" className="text-warm-yellow">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Sub-task Title"
            defaultValue={initialData ? initialData.title : undefined}
            required
            className="p-2 rounded-md focus:outline-none bg-text-field-bg"
          />
        </div>
        <button
          type="submit"
          className="border-1 bg-warm-yellow py-2 px-4 rounded-md"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </form>
    </Card>
  );
};

export default SubTaskForm;
